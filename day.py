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
            _sort_parts = day.split('.')
            _sortkey = '{0}{1}{2}'.format(_sort_parts[2], _sort_parts[0], _sort_parts[1])
            if _user is not None:
                if _is_today:
                    _book = model.Book.gql('where userId = :1 and dayId = :2', _user, day).get()

                    if _book is None:
                        _template = TEMPLATES.get_template('day.html')
                        self.response.write(
                           _template.render({
                               'user': _user,
                               'title': 'Daily Six Times Book',
                               'day': day,
                               'sortkey': _sortkey,
                               'bookdata': DEFAULT_DAY
                           })
                        )

                    elif _book.data == '':
                        _template = TEMPLATES.get_template('day.html')
                        self.response.write(
                           _template.render({
                               'user': _user,
                               'title': 'Daily Six Times Book',
                               'day': day,
                               'sortkey': _sortkey,
                               'bookdata': DEFAULT_DAY
                           })
                        )

                    else:
                        _previous_book = model.Book.gql('where sortkey > :1 order by sortkey desc', _book.sortkey).get()
                        _next_book = model.Book.gql('where sortkey < :1 order by sortkey desc', _book.sortkey).get()

                        _parts = {}
                        _template = TEMPLATES.get_template('day.html')
                        _data = json.loads(base64.decodestring(_book.data))
                        _data['user'] = _user
                        _data['title'] = 'Daily Six Times Book: %s' % day
                        _data['day'] = day
                        _data['bookdata'] = base64.decodestring(_book.data).decode('utf-8').replace("'", '&apos;')
                        _data['prev'] = '' if _previous_book is None else _previous_book.dayId
                        _data['next'] = '' if _next_book is None else _next_book.dayId
                        
                        self.response.write( _template.render( _data ))

                else:
                    _book = model.Book.gql('where userId = :1 and dayId = :2', _user, day).get()
                    if _book is None:
                        _book = model.Book(
                            userId = _user,
                            dayId = day,
                            sortkey = _sortkey,
                            data = base64.encodestring(DEFAULT_DAY)
                        )

                    _all_books = model.Book.all()
                    logging.info(str(help(_all_books.filter)))
                    _previous_book = model.Book.gql('where sortkey > :1 order by sortkey desc',  _book.sortkey).get()
                    _next_book = model.Book.gql('where sortkey < :1 order by sortkey desc', _book.sortkey).get()
                    logging.info(_book.sortkey)
                    logging.info(_previous_book)
                    logging.info(_next_book)

                    _template = TEMPLATES.get_template('day.html')
                    self.response.write(
                       _template.render({
                           'user': _user,
                           'title': 'Daily Six Times Book',
                           'day': day,
                           'bookdata': base64.decodestring(_book.data).decode('utf-8').replace("'", '&apos;'),
                           'prev': '' if _previous_book is None else _previous_book.dayId,
                           'next': '' if _next_book is None else _next_book.dayId
                       })
                    )                       

            else:
                self.redirect('/')

        else:
            self.redirect('/')


app = webapp2.WSGIApplication(
    [ ('/day/(.*)', DayHandler) ], 
    debug = True
)
