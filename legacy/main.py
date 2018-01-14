#!/usr/bin/env python

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

class MainHandler(webapp2.RequestHandler):
    def get(self):
        _user = user.get_user(self.request)
        if _user is None:
            template = TEMPLATES.get_template('new-index.html')

            self.response.out.write(
                template.render(
                    {
                        'user': _user,
                        'title': 'Daily Six Times Book',
                    }
                )
            )
        else:
            self.redirect('/home')

app = webapp2.WSGIApplication([('/', MainHandler)], debug=True)

