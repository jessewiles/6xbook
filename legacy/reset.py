#!/usr/bin/env python

import base64
import hashlib
import jinja2
import os
import logging
import main
import model
import user
import uuid
import webapp2

from google.appengine.api import mail

RESET_EMAIL_MESSAGE = '''\
Please navigate to the link below to reset your password:

%s
'''


class ResetHandler(webapp2.RequestHandler):
    def get(self):
        _user = user.get_user(self.request)
        template = main.TEMPLATES.get_template('reset.html')
        self.response.out.write(
            template.render(
                {
                    'user': _user,
                    'title': 'Daily Six Times Book',
                }
            )
        )

    def post(self):
        _email = self.request.get('email')
        _user =  model.User.gql('where email = :1', _email).get()

        if _user is None:
            template = main.TEMPLATES.get_template('reset.html')
            self.response.out.write(
                template.render(
                    {
                        'user': _user,
                        'title': 'Daily Six Times Book',
                        'message': 'Unable to find a registered user with that email address.  Please try again or slick Sign up.'
                    }
                )
            )

        else:
            _knock  = str(uuid.uuid4())
            _reset = model.Reset(
                userId = _user,
                knock = _knock
            )
            _reset.put()

            confirmation_url = '%s/reset/%s' % (self.request.host_url, _knock)
            sender_address = "Six Times Book <helper@6xbook.appspotmail.com>"
            subject = "[6xbook] Reset your password"
            body = RESET_EMAIL_MESSAGE % confirmation_url
            mail.send_mail(sender_address, _email, subject, body)

            _template = main.TEMPLATES.get_template('index.html')
            self.response.out.write(
                _template.render(
                    {
                        'user': _user,
                        'title': 'Daily Six Times Book',
                        'message': 'We sent a link to %s.  Please click the link to reset your password.' % (_email),
                        'len': len
                    }
                )
            )

class ResetClickedHandler(webapp2.RequestHandler):
    def get(self, knock):
        _reset = model.Reset.gql('where knock = :1', knock).get()
        if _reset is None:
            self.redirect('/')
        else:
            _template = main.TEMPLATES.get_template('reset-clicked.html')
            self.response.write(
                _template.render(
                    {
                        'title': 'Daily Six Times Book',
                        'knock': knock
                    }
                )
            )

    def post(self, knock):
        _reset = model.Reset.gql('where knock = :1', knock).get()
        if _reset is None:
            self.error(404)

        else:
            _user = model.User.get(_reset.userId.key())
            if _user is None:
                self.error(404)

            else:
                _password = self.request.get('password')
                _confirm_password = self.request.get('confirm-password')

                if _password == _confirm_password:
                    _salted_word = '%s:%s' % (_password, _user.salt)
                    _store_word = base64.encodestring(hashlib.sha256(_salted_word).digest()).strip()
                    _user.password = _store_word
                    _user.put()

                    _reset.delete()

                    self.redirect('/login')

                else:
                    _template = main.TEMPLATES.get_template('reset-clicked.html')
                    self.response.write(
                        _template.render(
                            {
                                'title': 'Six Times Book',
                                'message': 'Passwords do not match.  Please try again.',
                                'knock': knock
                            }
                        ) 
                    )


app = webapp2.WSGIApplication(
    [
        ('/reset/(.*)', ResetClickedHandler), 
        ('/reset', ResetHandler)
    ], debug=True)
