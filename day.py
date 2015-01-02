#!/usr/bin/env python

import base64
import webapp2
import jinja2
import json
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

TODAY_EXPRESSION = re.compile('^\/day\/[0-1][0-9]\.[0-3][0-9]\.20[1-9][0-9]$')

DEFAULT_DAY = json.dumps(
    {
        'alarm1': 'Alarm: 8:00am',
        'theme1': 'Protect life',
        'alarm2': 'Alarm: 10:00am',
        'theme2': r'Respect other&apos;s property',
        'alarm3': 'Alarm: 1:00pm',
        'theme3': r'Respect other&apos;s relationships',
        'alarm4': 'Alarm: 3:00pm',
        'theme4': 'Speak truthfully',
        'alarm5': 'Alarm: 5:00pm',
        'theme5': 'Speak to unite',
        'alarm6': 'Alarm: 7:00pm',
        'theme6': 'See what causes things'
    }
)

class DayHandler(webapp2.RequestHandler):
    def get(self, day):
        _valid = re.search(TODAY_EXPRESSION, self.request.path) is not None
        if _valid:
            _user = user.get_user(self.request)
            _today = utils.get_user_day(_user)
            _is_today = (day == _today)
            if _user is not None:
                if _is_today:
                    _book = model.Book.gql('where userId = :1 and dayId = :2', _user, day).get()
                    if _book is None:
                        _template = TEMPLATES.get_template('day.html')
                        self.response.write(
                           _template.render(
                               {
                                   'user': _user,
                                   'title': 'Daily Six Times Book',
                                   'day': day,
                                   'bookdata': DEFAULT_DAY
                               }
                           )
                        )

                    elif _book.data == '':
                        _template = TEMPLATES.get_template('day.html')
                        self.response.write(
                           _template.render(
                               {
                                   'user': _user,
                                   'title': 'Daily Six Times Book',
                                   'day': day,
                                   'bookdata': DEFAULT_DAY
                               }
                           )
                        )

                    else:
                        _parts = {}
                        _template = TEMPLATES.get_template('day.html')
                        _data = json.loads(base64.decodestring(_book.data))
                        _data['user'] = _user
                        _data['title'] = 'Daily Six Times Book: %s' % day
                        _data['day'] = day
                        _data['bookdata'] = base64.decodestring(_book.data).decode('utf-8').replace("'", '&apos;')
                        
                        self.response.out.write( _template.render( _data ))

                else:
                    _book = model.Book.gql('where userId = :1 and dayId = :2', _user, day).get()
                    if _book is None:
                        _book = model.Book(
                            userId = _user,
                            dayId = day,
                            data = ''
                        )

                    _template = TEMPLATES.get_template('day.html')
                    self.response.write(
                       _template.render(
                           {
                               'user': _user,
                               'title': 'Daily Six Times Book',
                               'day': day,
                               'bookdata': base64.decodestring(_book.data).decode('utf-8').replace("'", '&apos;')
                           }
                       )
                    )                       

            else:
                self.redirect('/')

        else:
            self.redirect('/')


app = webapp2.WSGIApplication(
    [ ('/day/(.*)', DayHandler) ], 
    debug = True
)
