from werkzeug.security import generate_password_hash, check_password_hash
from app import db, login
import os

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key = True)
    display_name = db.Column(db.String(20), nullable = False)
    email = db.Column(db.String(320), unique=True, nullable = False)
    hashed_password = db.Column(db.String(128), nullable = False)

    # TODO: Relationships and backrefs with plays and tokens

class Plays(db.Model):
    play_id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer)
    letter_guessed = db.Column(db.String(1))
    is_correct = db.Column(db.Boolean)
    game_mode = db.Column(db.Integer) # options are 1 or 2

    # TODO: Relationships/backrefs with user

class Tokens(db.Model):
    pass
    # TODO: Relationships/backrefs with user