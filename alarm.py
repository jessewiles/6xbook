#!/usr/bin/env python

import logging
import model
import time
import webapp2

from google.appengine.api import mail

NOTIFY_EMAIL_MESSAGE = '''\
You have set up an alarm to keep your daily book.  Please navigate to the link
below to make an entry.

http://6xbook.appspot.com/
'''


class AlarmHandler(webapp2.RequestHandler):
    def get(self):
        #logging.info('HACK JESSE: begin')
        if self.request.headers.has_key('X-Appengine-Cron'):
            #logging.info('HACK JESSE: a: %s' % self.request.headers['X-Appengine-Cron'])
            if self.request.headers['X-Appengine-Cron'] == 'true':
                _gmt = time.gmtime()
                _hour = _gmt.tm_hour
                _minute = _gmt.tm_min

                #logging.info('HACK JESSE: b: %d :: %d' % (_hour, _minute))
                # only notify on the hour for the moment to verify com
                #
                _alarms = model.Alarm.gql('where hour = :1 and minute = :2', _hour, _minute).fetch(limit=None)
                #logging.info('HACK JESSE: c: %d alarms' % (len(_alarms)))

                for _alarm in _alarms:
                    _user = model.User.get(_alarm.userId.key())
                    #logging.info('HACK JESSE: d: %s' % (str(_user)))

                    if _user is not None and _user.notify:
                        _sender_address = "Six Times Book <helper@6xbook.appspotmail.com>"
                        _subject = "[6xbook] Book alarm %d" % _alarm.orderId
                        _body = NOTIFY_EMAIL_MESSAGE
                        #logging.info('HACK JESSE: sending to: %s' % (_user.email))
                        mail.send_mail(_sender_address, _user.email, _subject, _body)


class StopNotificationHandler(webapp2.RequestHandler):
    def get(self, param_user_id):


app = webapp2.WSGIApplication([
        ('/dorje_chupa/alarm', AlarmHandler),
        ('/stop-notification/(.*)', StopNotificationHandler)
    ],
    debug=True
)

