#!/usr/bin/env python

import base64
import json
import logging
import model
import user
import webapp2

class DbAdminHandler(webapp2.RequestHandler):
    def get(self):
        _users  = model.User.all()

        for _user in _users:
            _themes = model.Theme.gql('where userId = :1 order by orderId desc', _user).fetch(limit=None)
            for _theme in _themes:
                if not _theme.last:
                    _theme.last = False
                    _theme.put()
        self.response.write('yep')
                
class DaySortFieldHandler(webapp2.RequestHandler):
    def get(self):
        _books = model.Book.all()
        _count = 0

        for _book in _books:
            _count = _count + 1
            _parts = _book.dayId.split('.')
            _book.sortkey = '{0}{1}{2}'.format(_parts[2], _parts[0], _parts[1])
            _book.put()

        self.response.write('Processed %d books.' % (_count))

app = webapp2.WSGIApplication([('/_db/theme_limit', DbAdminHandler), ('/_db/book_sortkey', DaySortFieldHandler)], debug=True)

