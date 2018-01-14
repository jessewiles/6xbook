#!/usr/bin/env python

import base64
import cook
import logging
import hashlib
import model
import user
import utils
import uuid
import webapp2

import defaults
import main

from google.appengine.api import mail

class VerifyHandler(webapp2.RequestHandler):
    def get(self, vid):
        verify = model.Verify.gql('where knock = :1', vid).get()
        if verify is not None:
            _user = model.User.get(verify.userId.key())
            # Handle refresh on verify url
            #
            if _user.verified:
                self.redirect('/')
            else:
                _user.verified = True
                _user.put()

                for i in xrange(0,len(defaults.DEFAULT_ALARMS)):
                    _hour, _ampm = utils.resolve_to_gmt(defaults.DEFAULT_ALARMS[i]['hour'], _user.gmt)
                    alarm = model.Alarm(
                        userId = _user,
                        orderId = (i + 1),
                        hour = _hour,
                        minute = defaults.DEFAULT_ALARMS[i]['minute']
                    )
                    alarm.put()

                _count = len(defaults.DEFAULT_THEMES)
                for i in xrange(0, _count):
                    theme = model.Theme(
                        userId = _user,
                        orderId = (i + 1),
                        last = ((i + 1) == _count),
                        title = defaults.DEFAULT_THEMES[i]['title'],
                        description = defaults.DEFAULT_THEMES[i]['description']
                    )
                    theme.put()

                _cook = model.Cook(
                    userId = _user,
                    dayId = utils.get_user_day(_user),
                    nextId = 7,
                    book = [1, 2, 3, 4, 5, 6]
                )
                _cook.put()

                sid = str(uuid.uuid4())
                session = model.Session(userId = _user, sid = sid)
                session.put()
                self.response.set_cookie('sid', sid)

                template = main.TEMPLATES.get_template('index.html')
                self.response.write(
                    template.render({
                        'title': 'Daily Six Times Book', 
                        'user': _user, 
                        'today': utils.get_user_day(_user),
                        'months': {
                            '01': 'january', '02': 'february', '03': 'march', '04': 'april',
                            '05': 'may', '06': 'june', '07': 'july', '08': 'august',
                            '09': 'september', '10': 'october', '11': 'november', '12': 'december'
                        },
                        'message': 'Verified this email.  Please enjoy!',
                        'len': len
                    })
                )

        else:
            template = main.TEMPLATES.get_template('register.html')
            self.response.write(
                template.render({'title': 'Daily Six Times Book', 'message': 'Unable to verify this account.  Please try again.'})
            )


app = webapp2.WSGIApplication([('/verify/(.*)', VerifyHandler)], debug=True)

