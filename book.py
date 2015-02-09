#!/usr/bin/env python

import base64
import json
import logging
import model
import user
import webapp2

class BookHandler(webapp2.RequestHandler):
    def get(self, book_id):
        _user = user.get_user(self.request)
        if _user is None:
            self.error(404)
        else:
            _book = model.Book.gql('where userId = :1 and dayId = :2', _user, book_id).get()
            if _book is None:
                self.error(404)
            else:
                self.response.content_type = 'text/plain'
                self.response.write(
                    base64.decodestring(_book.data)
                )

    def post(self, book_id):
        _user = user.get_user(self.request)
        if _user is None:
            self.error(404)

        else:
            _book = model.Book.gql('where userId = :1 and dayId = :2', _user, book_id).get()

            if _book is None:
                _sort_parts = book_id.split('.')
                _sortkey = '{0}{1}{2}'.format(_sort_parts[2], _sort_parts[0], _sort_parts[1])

                _book = model.Book(
                    userId = _user,
                    dayId = book_id,
                    sortkey = _sortkey
                )
            _data = self.request.get('book')
            _encdata = _data.encode('utf-8')
            _book.data = base64.encodestring(_encdata).strip()
            _book.put()
 
            self.response.write('Success')

class BookSyncHandler(webapp2.RequestHandler):
    def get(self):
        _user = user.get_user(self.request)
        if _user is None:
            self.error(404)
        else:
            _list = []
            _pages = {}
            _books = model.Book.gql('where userId = :1', _user).fetch(limit=None)
            for _book in _books:
                _pages[_book.dayId] = base64.decodestring(_book.data)
                _list.append(_book.dayId)

            self.response.content_type = 'application/json'
            self.response.write(
                json.dumps(
                    {
                        'pages': _pages,
                        'list': _list
                    }
                )
            )

app = webapp2.WSGIApplication([('/book/sync', BookSyncHandler), ('/book/([0-1][0-9]\.[0-3][0-9]\.2[0-9][0-9][0-9])', BookHandler)], debug=True)

