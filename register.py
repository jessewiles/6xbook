#!/usr/bin/env python

import base64
import logging
import hashlib
import model
import re
import uuid
import user
import webapp2

import main

from google.appengine.api import mail

VERIFY_EMAIL_MESSAGE = '''\
Thank you for creating an account at the Daily Six Times Book!
Please confirm your email address by clicking on the link below:

%s
'''

VERIFY_MESSAGE = '''We have sent an email to: %s, to verify your registration.  Please check your email to complete your registration.'''

RE_GMT_EXPRESSION = re.compile('^[\-\+][0-9][0-2]*$')

class RegisterHandler(webapp2.RequestHandler):
    def get(self):
        cont = self.request.get('continue')
        template = main.TEMPLATES.get_template('register.html')
        self.response.out.write(
            template.render(
                {
                    'cont': cont,
                    'title': 'Daily Six Times Book: Register'
                }
            )
        )

    def post(self):
        cont = self.request.get('continue')
        email = self.request.get('email')
        password = self.request.get('password')
        confirm_password = self.request.get('confirm-password')
        _gmt = validate_gmt(self.request.get('client-gmt'))
        
        if confirm_password == password:
            _user = model.User.gql('where email = :1', email).get()

            if _user is not None:
                message = 'User with this email already exists.'
                template = main.TEMPLATES.get_template('register.html')
                self.response.out.write(template.render({'message': message}))

            else:
                if not mail.is_email_valid(email):
                    message = 'This email address is not well-formed.'
                    template = main.TEMPLATES.get_template('register.html')
                    self.response.out.write(template.render({'message': message}))

                else:
                    salt = str(uuid.uuid4())
                    salted_word = '%s:%s' % (password, salt)
                    store_word = base64.encodestring(hashlib.sha256(salted_word).digest()).strip()
                    _user = model.User(
                        email = email,
                        password = store_word,
                        salt = salt,
                        gmt = _gmt
                    )
                    _user.put()

                    verify = model.Verify(userId = _user.key(), knock = str(uuid.uuid4()))
                    verify.put()

                    confirmation_url = '%s/verify/%s' % (self.request.host_url, verify.knock)
                    sender_address = "Six Times Book <helper@6xbook.appspotmail.com>"
                    subject = "[6xbook] Confirm your registration"
                    body = VERIFY_EMAIL_MESSAGE % confirmation_url
                    mail.send_mail(sender_address, email, subject, body)
                    logging.info(confirmation_url)

                    template = main.TEMPLATES.get_template('new-index.html')
                    self.response.write(
                        template.render(
                            {
                                'message': VERIFY_MESSAGE % email,
                                'user': None
                            }
                        )
                    )

        else:
            message = 'Passwords do not match.  Please try again.'
            template = main.TEMPLATES.get_template('register.html')
            self.response.out.write(
                template.render(
                    {
                        'message': message, 
                        'email': self.request.get('email'),
                        'focusid': 'password-input'
                    }
                )
            )

def validate_gmt(gmt):
    _gmt = '' if gmt is None else gmt
    result = _gmt
    _match = re.match(RE_GMT_EXPRESSION, _gmt)
    if _match is None:
        result = '+0'

    if len(result) == 3:
        if not result[1:2] == '1':
            result = '+0'

    return result

app = webapp2.WSGIApplication([('/register', RegisterHandler)], debug=True)

