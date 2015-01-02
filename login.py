#!/usr/bin/env python

import base64
import logging
import json
import hashlib
import model
import time
import uuid
import webapp2

import main

class LoginHandler(webapp2.RequestHandler):
    def get(self):
        cont = self.request.get('continue')
        if cont == '':
            cont = '/home'

        template = main.TEMPLATES.get_template('login.html')
        self.response.out.write(
            template.render(
                {
                    'continue': cont,
                    'title': 'Daily Six Times Book: Login'
                }
            )
        )

    def post(self):
        cont = self.request.get('continue')
        email = self.request.get('email')
        password = self.request.get('password')
        _stay = self.request.get('stay')

        user = model.User.gql('where email = :1', email).get()

        if user is not None:
            salted_word = '%s:%s' % (password, user.salt)
            store_word = base64.encodestring(hashlib.sha256(salted_word).digest()).strip()

            if user.password == store_word:
                sid = str(uuid.uuid4())
                session = model.Session(userId = user, sid = sid)
                session.put()
                time.sleep(0.5)

                if _stay:
                    self.response.set_cookie('sid', sid, max_age=31536000)

                else:
                    self.response.set_cookie('sid', sid)
                cont = self.request.get('continue')
                if cont:
                    self.redirect('/home')
                else:
                    self.redirect('/home')

            else:
                message = 'Invalid password.  Please try again.'
                template = main.TEMPLATES.get_template('login.html')
                self.response.out.write(template.render({'continue': cont, 'message': message, 'email': email, 'focusid': 'password-input'}))

        else:
            message = 'Unknown email: %s.  Please try again.' % (email)
            template = main.TEMPLATES.get_template('login.html')
            self.response.out.write(template.render({'continue': cont, 'message': message}))


    def put(self):
        sid = self.request.cookies.get('sid')
        _session = model.Session.gql('where sid = :1', sid).get()

        self.response.content_type = 'application/json'
        if _session is not None:
            _user = model.User.get(_session.userId.key())

            if _user is not None:
                old_password = self.request.get('_old')

                salted_word = '%s:%s' % (old_password, _user.salt)
                store_word = base64.encodestring(hashlib.sha256(salted_word).digest()).strip()

                if store_word == _user.password:
                    _new_password = self.request.get('_new')
                    _confirm_new_password = self.request.get('_confirm')
                    if _new_password == _confirm_new_password:
                        new_salt = str(uuid.uuid4())
                        new_salted_word = '%s:%s' % (_new_password, new_salt)
                        new_store_word = base64.encodestring(hashlib.sha256(new_salted_word).digest()).strip()

                        _user.salt = new_salt
                        _user.password = new_store_word
                        _user.put()

                        self.response.write(
                            json.dumps(
                                {
                                    'message': 'Password changed successfully.  Logging you out...',
                                    'delete_session': True,
                                    'redirect': '/logout'
                                }
                            )
                        )

                    else:
                        self.response.write(
                            json.dumps(
                                {
                                    'message': 'Password and confirm password do not match.  Please try again.',
                                    'delete_session': False,
                                }
                            )
                        )

                else:
                    self.response.write(
                        json.dumps(
                            {
                                'message': 'Old password and current password do not match.  Please try again.',
                                'delete_session': False,
                            }
                        )
                    )
            else:
                self.response.write(
                    json.dumps(
                        {
                            'message': 'Cannot find a user with this session. Redirecting ... ',
                            'delete_session': True,
                            'redirect': '/login'
                        }
                    )
                )
        else:
            logging.debug('Redirecting on change password for lack of session.')
            self.response.write(
                json.dumps(
                    {
                        'message': 'Cannot find a user with this session. Redirecting ... ',
                        'delete_session': True,
                        'redirect': '/login'
                    }
                )
            )




app = webapp2.WSGIApplication([('/login', LoginHandler)], debug=True)

