#!/usr/bin/env python

import logging
import model

def get_user(request):
    result = None
    sid = request.cookies.get('sid')
    session = model.Session.gql('where sid = :1', sid).get()
    if session is not None:
        _user = model.User.get(session.userId.key())
        if _user is not None:
            result = _user

    return result

