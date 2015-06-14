#!/usr/bin/env python
#

import base64
import defaults
import hashlib
import json
import logging
import main
import model
import user
import utils
import uuid
import webapp2

from decorators import jsonify


class SettingsHandler(webapp2.RequestHandler):
    def get(self):
        _user = user.get_user(self.request)
        themes = model.Theme.gql('where userId = :1 order by orderId', _user).fetch(limit=200)
        _alarms = model.Alarm.gql('where userId = :1 order by orderId', _user).fetch(limit=None)
        _prepared_alarms = self.prepare_alarms(_alarms, _user.gmt)

        template = main.TEMPLATES.get_template('settings.html')

        self.response.write(
            template.render(
                {
                    'themes': themes,
                    'alarms': _prepared_alarms,
                    'addid': len(themes) + 1,
                    'title': 'Daily Six Times Book: Settings',
                    'user': _user
                }
            )
        )

    def prepare_alarms(self, alarms, gmt):
        result = []
        for alarm in alarms:
            hour = alarm.hour
            _rhour, _rampm = utils.resolve_to_gmt_offset(hour, gmt)
          
            minute = str(alarm.minute)
            if len(minute) == 1:
                minute = '0%s' % minute

            result.append({'orderId': str(alarm.orderId), 'hour': str(_rhour), 'minute': str(minute), 'ampm': _rampm})

        return result

class GMTHandler(webapp2.RequestHandler):
    def put(self):
        _user = user.get_user(self.request)
        if _user is not None:
            _gmt = self.request.get('gmt')
            _offset = utils.calculate_gmt_offset(_user.gmt, _gmt)
            _user.gmt = _gmt
            _user.put()

            _alarms = model.Alarm.gql('where userId = :1 order by orderId', _user).fetch(limit=6)
            for _alarm in _alarms:
                _new_hour = _alarm.hour + _offset

                if _new_hour == 24:
                    _new_hour = 0
                elif _new_hour > 24:
                    _new_hour = _new_hour - 24
                elif _new_hour < 0:
                    _new_hour = 24 + _new_hour

                _alarm.hour = _new_hour
                _alarm.put()

            _message = 'GMT updated'

            self.response.content_type = 'application/json'
            self.response.write(
                json.dumps(
                    {
                        'message': _message
                    }
                )
            )

class NotifyHandler(webapp2.RequestHandler):
    def put(self):
        _user = user.get_user(self.request)
        if _user is not None:
            _notify = self.request.get('notify')

            _commit_notify = True
            if _notify == 'off':
                _commit_notify = False

            _user.notify = _commit_notify
            _user.put()
            _message = 'Notify updated'

            self.response.content_type = 'application/json'
            self.response.write(
                json.dumps(
                    {
                        'message': _message
                    }
                )
            )

class AlarmHandler(webapp2.RequestHandler):
    def put(self):
        _user = user.get_user(self.request)
        if _user is not None:
            _order_id = self.request.get('order_id')
            _alarm = model.Alarm.gql('where userId = :1 and orderId = :2', _user, int(_order_id)).get()

            if _alarm is not None:
                _column = self.request.get('column')
                _new_value = self.request.get('new_value')

                if _column == 'hour' or _column == 'minute':
                    _new_value = int(_new_value)

                if _column == 'hour':
                    _result = _alarm.hour
                    _old_value, _ignore = utils.resolve_to_gmt_offset(_alarm.hour, _user.gmt)

                    _difference = utils.resolve_hour_to_stored_gmt_difference(_old_value, _new_value)
                    _possible_value = _alarm.hour - _difference
                    _result = _possible_value

                    if _possible_value == 24:
                        _result = 0
                    elif _possible_value > 24:
                        _result = _possible_value - 24
                    elif _possible_value < 0:
                        _result = _possible_value + 24

                    _alarm.hour = _result

                elif _column == 'minute':
                    _alarm.minute = _new_value

                elif _column == 'ampm':
                    _ignore, _old_ampm = utils.resolve_to_gmt_offset(_alarm.hour, _user.gmt)
                    _old_hour = _alarm.hour
                    _result = _old_hour

                    if _old_ampm == 'am':
                        _result = _old_hour - 12
                    elif _old_ampm == 'pm':
                        _result = _old_hour + 12

                    if _result == 24:
                        _result = 0
                    elif _result > 24:
                        _result = _result - 24
                    elif _result < 0:
                        _result = _result + 24

                    _alarm.hour = _result

                _alarm.put()
                _message = 'Alarm updated.'

                self.response.content_type = 'application/json'
                self.response.write(
                    json.dumps(
                        {
                            'message': _message
                        }
                    )
                )

class ThemeAddHandler(webapp2.RequestHandler):
    def post(self):
        _user = user.get_user(self.request)
        if _user is None:
            self.error(404)

        else:
            _last_theme = model.Theme.gql('where userId = :1 and last = :2', _user, True).get()
            _next_id = _last_theme.orderId + 1
            _last_theme.last = False
            _last_theme.put()

            _title = self.request.get('title')
            _description = self.request.get('description')

            _theme = model.Theme(
                userId = _user,
                orderId = _next_id,
                last = True,
                title = _title,
                description = _description
            )
            _theme.put()

            self.response.content_type = 'application/json'
            self.response.write(
                json.dumps(
                    {
                        'message': 'Theme added.'
                    }
                )
            )

class ThemeNextHandler(webapp2.RequestHandler):
    def get(self):
        _user = user.get_user(self.request)
        _last_theme = model.Theme.gql('where userId = :1 and last = :2', _user, True).get()

        self.response.content_type = 'application/json'
        self.response.write(
            json.dumps(
                {
                    'next': (int(_last_theme.orderId) + 1)
                }
            )
        )

class ThemeHandler(webapp2.RequestHandler):
    def get(self, orderid):
        _user = user.get_user(self.request)
        _theme = model.Theme.gql('where userId = :1 and orderId = :2', _user, int(orderid)).get()
        if _theme is not None:
            self.response.content_type = 'application/json'
            self.response.write(
                json.dumps(
                    {
                        'title': _theme.title,
                        'description': _theme.description,
                        'orderid': _theme.orderId
                    }
                )
            )
        else:
            self.error(404)

    def put(self, orderid):
        _user = user.get_user(self.request)
        _theme = model.Theme.gql('where userId = :1 and orderId = :2', _user, int(orderid)).get()
        if _theme is not None:
            _theme.title = self.request.get('_title')
            _theme.description = self.request.get('_description')
            _theme.put()

            self.response.content_type = 'application/json'
            self.response.write(
                json.dumps(
                    {
                        'message': 'Theme updated.'
                    }
                )
            )
        else:
            self.error(404)

    def delete(self, orderid):
        _user = user.get_user(self.request)
        _theme = model.Theme.gql('where userId = :1 and orderId = :2', _user, int(orderid)).get()
        if _theme is not None:
            if _theme.last:
                _prev = model.Theme.gql('where userId = :1 and orderId = :2', _user, (int(orderid) - 1)).get()
                if _prev is not None:
                    _prev.last = True
                    _prev.put()

            _theme.delete()

            # re-number
            #
            _next_theme_id = int(orderid) + 1
            _next_theme = model.Theme.gql('where userId = :1 and orderId = :2', _user, _next_theme_id).get()
            while _next_theme is not None:
                _next_theme.orderId = _next_theme_id - 1
                _next_theme.put()

                _next_theme_id = _next_theme_id + 1
                _next_theme = model.Theme.gql('where userId = :1 and orderId = :2', _user, _next_theme_id).get()

        else:
            self.error(404)

class ThemesHandler(webapp2.RequestHandler):
    @jsonify
    def get(self):
        _user = user.get_user(self.request)
        if _user is None:
            self.error(403)
        else:
            _themes = model.Theme.gql('where userId = :1 order by orderId', _user)
            _jsonable = []
            _count = 1
            for _theme in _themes:
                _jsonable.append({'number': str(_count), 'title': _theme.title, 'id': str(_theme.key())})
                _count = _count + 1
            return {'themes': _jsonable} 


app = webapp2.WSGIApplication(
    [
        ('/settings', SettingsHandler),
        ('/settings/gmt', GMTHandler),
        ('/settings/notify', NotifyHandler),
        ('/settings/alarm', AlarmHandler),
        ('/settings/theme/add', ThemeAddHandler),
        ('/settings/theme/next', ThemeNextHandler),
        ('/settings/theme/([0-9]+)', ThemeHandler),
        ('/settings/themes', ThemesHandler)
    ], 
    debug=True
)

