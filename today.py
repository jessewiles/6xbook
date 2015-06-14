#!/usr/bin/env python
#

import webapp2
import jinja2
import os
import logging
import model
import re
import user
import utils

TEMPLATES = jinja2.Environment(
    loader=jinja2.FileSystemLoader(
        os.path.join(os.path.dirname(__file__), 'templates')
    )
)

class TodayHandler(webapp2.RequestHandler):
    def get(self):
        #_valid = re.search(TODAY_EXPRESSION, self.request.path) is not None
        #if _valid:
        _user = user.get_user(self.request)
        _day = utils.get_user_day(_user)

        if _user is not None:
            _cook = model.Cook.gql('where userId = :1 and dayId = :2', _user, _day).get()

            if _cook is None:
                _template = TEMPLATES.get_template('today.html')
                self.response.write(
                   _template.render(
                       {
                           'user': _user,
                           'title': 'Daily Six Times Book',
                           'day': _day
                       }
                   )
                )

            else:
                _parts = {}
                _counter = 0
                for n in _cook.book:
                    _counter = _counter + 1
                    _theme = model.Theme.gql('where userId = :1 and orderId = :2', _user, n).get()
                    _alarm = model.Alarm.gql('where userId = :1 and orderId = :2', _user, _counter).get()
                    if _theme is not None and _alarm is not None:
                        _hour, _ampm = utils.resolve_to_gmt_offset(_alarm.hour, _user.gmt)
                        _parts['alarm%d_time' % _counter] = '%d:%s %s' % (_hour, utils.zpad_minute(_alarm.minute), _ampm)
                        _parts['theme%d_title' % _counter] = _theme.title

                _template = TEMPLATES.get_template('book.html')
                _parts['user'] = _user
                _parts['title'] = 'Daily Six Times Book: %s' % _day
                _parts['day'] = _day
                self.response.out.write( _template.render(_parts))

        else:
            _template = TEMPLATES.get_template('today.html')

            self.response.write(
               _template.render(
                   {
                       'user': _user,
                       'title': 'Daily Six Times Book',
                       'day': _day
                   }
               )
            )

app = webapp2.WSGIApplication([('/today', TodayHandler)], debug=True)

