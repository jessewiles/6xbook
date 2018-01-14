#!/usr/bin/env python

import jinja2
import logging
import model
import os
import time
import user
import utils
import webapp2

from google.appengine.api import mail

TEMPLATES = jinja2.Environment(
    loader=jinja2.FileSystemLoader(
        os.path.join(os.path.dirname(__file__), 'templates')
    )
)

NOTIFY_EMAIL_MESSAGE = u'''\
You have set up an alarm to keep your daily book.  Please navigate to the link
below to make an entry.

{0}

To unsubscribe from these updates, please visit the following link:

    {1}
'''

NOTIFY_EMAIL_MESSAGE_HTML = u'''\
<div>
    <h4> Daily Six Times Book </h4>

    <p> You have set up an alarm to keep your daily book.  Please navigate to the link
        below to make an entry. </p>

    <dl>
        <dt><a href="{0}" target="_blank">{0}</a></dt>
    </dl>

    <p> To unsubscribe from these updates, please visit the following link: </p>

    <dl>
        <dt><a href="{1}" target="_blank">Unsubscribe</a></dt>
    </dl>
</div>
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
                        _book_link = u'https://6xbook.appspot.com/day/{0}#{1}'.format(utils.get_user_day(_user), _alarm.orderId)
                        _unsubscribe_link = u'https://6xbook.appspot.com/stop-notification/{0}'.format(_user.key())
                        _body = NOTIFY_EMAIL_MESSAGE.format(_book_link, _unsubscribe_link)
                        _html = NOTIFY_EMAIL_MESSAGE_HTML.format(_book_link, _unsubscribe_link)
                        #logging.info('HACK JESSE: sending to: %s' % (_user.email))
                        #logging.info('HACK JESSE: {}'.format(_body))
                        mail.send_mail(_sender_address, _user.email, _subject, _body, html=_html)


class StopNotificationHandler(webapp2.RequestHandler):
    def get(self, param_user_id):
        _user = user.get_user(self.request)
        if type(_user) is model.User:
            try:
                _user.notify = False
                _user.put()

                _template = TEMPLATES.get_template('verify-stop-email.html')
                self.response.write(_template.render({'user': _user}))
            except Exception as e:
                self.error(500)
        else:
            self.redirect('/login?continue=/stop-notification/{}'.format(param_user_id))


app = webapp2.WSGIApplication([
        ('/dorje_chupa/alarm', AlarmHandler),
        ('/stop-notification/(.*)', StopNotificationHandler)
    ],
    debug=True
)

