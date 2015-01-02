# decorators.py
#

import json
import logging
import urllib
import user

def jsonify(param_method):
    def wrapper(self, *args, **kwargs):
        self.response.content_type = 'application/json'
        self.response.body = json.dumps(param_method(self, *args, **kwargs))
        return self.response
    return wrapper

def auth(param_method):
    def wrapper(self, *args, **kwargs):
        _user = user.get_user(self.request)
        if _user is not None:
            self.request.environ['user'] = _user
        else:
            self.redirect('/login?r=%s' % urllib.quote(self.request.url))
        result = param_method(self, *args, **kwargs)
        return result
    return wrapper

