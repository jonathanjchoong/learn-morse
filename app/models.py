from werkzeug.security import generate_password_hash, check_password_hash
from app import db, login
import os
from flask_login import UserMixin

# JON: ADDED USERMIXIN - HAVE NOT TESTED


class User(UserMixin, db.Model):
    # Defining columns
    id = db.Column(db.Integer, primary_key=True)
    display_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(320), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    # Defining relationships
    # Enables user.plays to return the users games. Backref allows Plays.user to return a user object
    plays = db.relationship("Play", backref="user", lazy=True)
    tokens = db.relationship("Token", backref="user", lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        return

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User user_id={self.id}, display_name={self.display_name}>"


class Play(db.Model):
    # Defining columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    letter_guessed = db.Column(db.String(1), nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    game_mode = db.Column(db.Integer, nullable=False)  # options are 1 or 2

    def __repr__(self):
        return f"<Play {self.id}>"


class Token(db.Model):
    # Defining columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    token_string = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f"<Play {self.id}>"

    # TODO: Implement token generation (ie. a function set_token())


@login.user_loader
def load_user(id):
    return User.query.get(int(id))
