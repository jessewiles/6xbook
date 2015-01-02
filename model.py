
from google.appengine.ext import db

class User(db.Model):
    email = db.StringProperty()
    password = db.StringProperty()
    salt = db.StringProperty()
    verified = db.BooleanProperty(default=False)
    gmt = db.StringProperty()
    notify = db.BooleanProperty(default=True)

class Session(db.Model):
    userId = db.ReferenceProperty(User)
    sid = db.StringProperty()

class Verify(db.Model):
    userId = db.ReferenceProperty(User)
    knock = db.StringProperty()

class Reset(db.Model):
    userId = db.ReferenceProperty(User)
    knock = db.StringProperty()

class Theme(db.Model):
    userId = db.ReferenceProperty(User)
    orderId = db.IntegerProperty()
    last = db.BooleanProperty(default=False)
    title = db.TextProperty()
    description = db.TextProperty()

class Alarm(db.Model):
    userId = db.ReferenceProperty(User)
    orderId = db.IntegerProperty()
    hour = db.IntegerProperty()
    minute = db.IntegerProperty()

class Book(db.Model):
    userId = db.ReferenceProperty(User)
    dayId = db.StringProperty()
    data = db.TextProperty()

class Cook(db.Model):
    userId = db.ReferenceProperty(User)
    dayId = db.StringProperty()
    nextId = db.IntegerProperty()
    book = db.ListProperty(int)

class Day(db.Model):
    userId = db.ReferenceProperty(User)
    dayId = db.StringProperty()
    data = db.TextProperty()

