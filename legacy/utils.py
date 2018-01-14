import logging
import datetime

# utilties for handling timezones, et al
#

def resolve_to_gmt(hour, gmt):
    _result = 0
    _operand, _offset = parse_gmt(gmt)
    if _operand == '+':
        result = hour - _offset
    elif _operand == '-':
        result = hour + _offset

    if result == 24:
        result = 0
    elif result > 24:
        result = result - 24
    elif result < 0:
        result = 24 + result

    return (result, 'am' if result < 12 else 'pm')

def calculate_gmt_offset(old_gmt, new_gmt):
    result = 0
    _old_operand, _old_offset = parse_gmt(old_gmt)
    _new_operand, _new_offset = parse_gmt(new_gmt)
    _mod_old_offset = 0 + _old_offset if _old_operand == '+' else 0 - _old_offset
    _mod_new_offset = 0 + _new_offset if _new_operand == '+' else 0 - _new_offset

    result = _mod_old_offset - _mod_new_offset 
    logging.info('%d :: %d :: %d' % (_mod_old_offset, _mod_new_offset, result))

    return result

def resolve_to_gmt_offset(hour, gmt):
    _hour = hour
    _operand, _offset = parse_gmt(gmt)
    if _operand == '+':
        _hour = _hour + _offset
    elif _operand == '-':
        _hour = _hour - _offset

    return resolve_to_ampm_format(_hour)

def resolve_to_ampm_format(hour):
    _hour = hour
    _ampm = 'am'

    if _hour == 12:
        _ampm = 'pm'
    elif _hour == 24:
        _hour = 12 
    elif _hour > 12 and _hour < 24:
        _hour = _hour - 12
        _ampm = 'pm'
    elif _hour > 24:
        _hour = _hour - 24
        _ampm = 'am'
    elif _hour < 1:
        if _hour == 0:
            _ampm = 'am'
        else:
            _ampm = 'pm'
        _hour = _hour + 12

    return (_hour, _ampm)

def parse_gmt(_gmt):
    result = ('+', 0)
    try:
        result = (_gmt[0:1], int(_gmt[1:]))
    except:
        pass
    return result

def resolve_hour_to_stored_gmt_difference(previous_hour, new_hour):
    _result = 0
    # 24 hour time is zero index when calculating differences
    # sic, the interval from 12pm to 1pm is a difference of 1, not 11
    # but is the interval betwee 12am and 1am
    #
    if previous_hour == 12:
        _result = 0 - new_hour
    elif new_hour == 12:
        _result = previous_hour - 0
    else:
        _result = previous_hour - new_hour
    return _result

def zpad_minute(minute):
    result = str(minute)
    if len(result) == 1:
        result = '0%s' % result

    return result

def zpad(val):
    result = str(val)
    if len(result) == 1:
        result = '0%s' % result

    return result

def get_user_day(auser, param_sort_key=False):
    if auser is None:
        _user_time = datetime.datetime.now(UserTime(0)).timetuple()

    else:
        _user_time = datetime.datetime.now(UserTime(int(auser.gmt))).timetuple()

    result = '%s.%s.%d' % (zpad(_user_time[1]), zpad(_user_time[2]), _user_time[0])
    if param_sort_key:
        result = '%s%s%s' % (zpad(_user_time[0]), zpad(_user_time[1]), _user_time[2])
    logging.info('result: %s' % result)
    return result

class UserTime(datetime.tzinfo):
     def __init__(self, offset):
         self._offset = offset

     def utcoffset(self, dt):
         return datetime.timedelta(hours=self._offset)

     def dst(self, dt):
         return datetime.timedelta(0)

