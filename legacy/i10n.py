#!/usr/bin/env python

# lots TODO here, but it's a start

import os

class LocaleBase(object):
    def __init__(self, localeString):
        self.localeString = localeString
        locales_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'locales')

    def get_string(self, identifier):
        if self.Strings.has_key(identifier):
            return self.Strings[identifier]


