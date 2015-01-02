
import re

RE_GMT_EXPRESSION = re.compile('^[\-\+][0-9][0-2]*$')
def validate_gmt(gmt):
    _gmt = '' if gmt is None else gmt
    result = _gmt
    _match = re.match(RE_GMT_EXPRESSION, _gmt)
    if _match is None:
        result = '+0'

    if len(result) == 3:
        if not result[1:2] == '1':
            result = '+0'

    return result

def resolve_hour(hour, gmt):
    _result = 0
    def parse_gmt(_gmt):
        result = ('+', 0)
        try:
            result = (_gmt[0:1], int(_gmt[1:]))
        except:
            pass
        return result

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

    return result

if __name__ == '__main__':
    print('--- texas edt')
    print(resolve_hour(10, '-5'))
    print(resolve_hour(12, '-5'))
    print(resolve_hour(14, '-5'))
    print(resolve_hour(16, '-5'))
    print(resolve_hour(18, '-5'))
    print(resolve_hour(20, '-5'))
    print ('---- somewhere in asia')
    print(resolve_hour(10, '+5'))
    print(resolve_hour(12, '+5'))
    print(resolve_hour(14, '+5'))
    print(resolve_hour(16, '+5'))
    print(resolve_hour(18, '+5'))
    print(resolve_hour(20, '+5'))
    print ('---- fiji')
    print(resolve_hour(10, '+12'))
    print(resolve_hour(12, '+12'))
    print(resolve_hour(14, '+12'))
    print(resolve_hour(16, '+12'))
    print(resolve_hour(18, '+12'))
    print(resolve_hour(20, '+12'))
    print ('---- atoll near hawaii')
    print(resolve_hour(10, '-11'))
    print(resolve_hour(12, '-11'))
    print(resolve_hour(14, '-11'))
    print(resolve_hour(16, '-11'))
    print(resolve_hour(18, '-11'))
    print(resolve_hour(20, '-11'))

