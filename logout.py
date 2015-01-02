#!/usr/bin/env python

import base64
import logging
import md5
import model
import uuid
import webapp2

import main

class LogoutHandler(webapp2.RequestHandler):
    def get(self):
        self.response.delete_cookie('sid')
        self.redirect('/')

app = webapp2.WSGIApplication([('/logout', LogoutHandler)], debug=True)

