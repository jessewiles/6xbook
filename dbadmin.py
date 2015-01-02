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
                

app = webapp2.WSGIApplication([('/_db/theme_limit', DbAdminHandler)], debug=True)

