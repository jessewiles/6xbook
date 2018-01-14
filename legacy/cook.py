#!/usr/bin/env python

import datetime
import json
import logging
import model
import utils
import webapp2

class CookHandler(webapp2.RequestHandler):
    def get(self):
        if self.request.headers.has_key('X-Appengine-Cron'):
            if self.request.headers['X-Appengine-Cron'] == 'true':
                _fiji = datetime.datetime.now(FijiTime()).timetuple()
                _day = '%s.%s.%d' % (utils.zpad(_fiji[1]), utils.zpad(_fiji[2]), _fiji[0])
                _users = model.User.all()

                for _user in _users:
                    _cook = model.Cook.gql('where userId = :1', _user).get()
                    if _cook is None:
                        _cook = model.Cook(
                            userId = _user,
                            dayId = _day,
                            nextId = 7,
                            book = [1, 2, 3, 4, 5, 6]
                        )

                    else:
                        _last_theme = model.Theme.gql('where userId = :1 and last = :2', _user, True).get() 
                        if (_last_theme is not None):
                            _book = []
                            _limit = _last_theme.orderId
                            # Re-purpose nextId to reflect
                            _new_next = _cook.nextId + 6
                            for i in xrange(_cook.nextId, _cook.nextId + 6):
                                if i > _limit:
                                    _book.append(-(_limit - i))
                                else:
                                    _book.append(i)

                            _cook.book = _book
                            _cook.nextId = _new_next if _new_next <= _limit else (_new_next - _limit)
                            _cook.dayId = _day

                    if _cook is not None:
                        _cook.put()

                        make_day(_user, _cook.book, _day)

def get_day():
    _fiji = datetime.datetime.now(FijiTime()).timetuple()
    return '%s.%s.%d' % (utils.zpad(_fiji[1]), utils.zpad(_fiji[2]), _fiji[0])

def make_day(auser, book_list, day):
    _parts = {}
    _counter = 0
    for n in book_list:
        _counter = _counter + 1
        _theme = model.Theme.gql('where userId = :1 and orderId = :2', auser, n).get()
        _alarm = model.Alarm.gql('where userId = :1 and orderId = :2', auser, _counter).get()
        if _theme is not None and _alarm is not None:
            _hour, _ampm = utils.resolve_to_gmt_offset(_alarm.hour, auser.gmt)
            _parts['alarm%d_time' % _counter] = '%d:%s %s' % (_hour, utils.zpad_minute(_alarm.minute), _ampm)
            _parts['theme%d_title' % _counter] = _theme.title

    _parts['title'] = 'Daily Six Times Book: %s' % day
    _day = model.Day.gql('where userId = :1 and dayId = :2', auser, day).get()
    if _day is None:
        _day = model.Day()

    _day.userId = auser
    _day.dayId = day
    _day.data = json.dumps(_parts)
        
    _day.put()


class FijiTime(datetime.tzinfo):
    def utcoffset(self, dt):
        return datetime.timedelta(hours=12)

    def dst(self, dt):
        return datetime.timedelta(0)
    
app = webapp2.WSGIApplication([('/dorje_chupa/cook', CookHandler)], debug=True)

