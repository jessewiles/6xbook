#!/usr/bin/env python

import webapp2
import jinja2
import os
import logging
import model
import re
import user
import utils

from decorators import auth

TEMPLATES = jinja2.Environment(
    loader=jinja2.FileSystemLoader(
        os.path.join(os.path.dirname(__file__), 'templates')
    )
)

class HomeHandler(webapp2.RequestHandler):
    @auth
    def get(self):
        _user = user.get_user(self.request)
        if _user is not None:
            template = TEMPLATES.get_template('index.html')
            _today = utils.get_user_day(_user)
            _books_query = model.Book.gql('where userId = :1 order by __key__ desc', _user).fetch(limit=200)
            _books = []
            for _book in _books_query:
                _parts = _book.dayId.split('.')
                _books.append('{0}{1}{2}'.format(_parts[2], _parts[0], _parts[1]))

            _books.sort()
            _books = [x for x in reversed(_books)]

            if len(_books) > 0 and _books[0] == utils.get_user_day(_user, param_sort_key=True):
                _books = _books[1:]

            for _book in _books:
                logging.info(_book)
            self.response.out.write(
                template.render({
                    'user': _user,
                    'title': 'Daily Six Times Book',
                    'today': _today,
                    'months': {
                        '01': 'january', '02': 'february', '03': 'march', '04': 'april',
                        '05': 'may', '06': 'june', '07': 'july', '08': 'august',
                        '09': 'september', '10': 'october', '11': 'november', '12': 'december'
                    },
                    'books': _books,
                    'len': len
                })
            )

        else:
            self.redirect('/')

app = webapp2.WSGIApplication([('/home', HomeHandler)], debug=True)

