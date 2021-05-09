import unittest
from app.models import User, Play, Token
from app import app, db
from config import TestingConfig

class DatabaseTests(unittest.TestCase):
    def setUp(self):
        app.config.from_object(TestingConfig)
        db.create_all()

        # Adding some users
        jeff = User(display_name = "Jeffrey", email = "my_names_jeff@gmail.com")
        jeff.set_password("I<322JumpStreet")

        tom = User(display_name = "Thomas", email = "my_names_not_jeff@gmail.com")
        tom.set_password("turkey-lover")

        db.session.add_all([jeff, tom])
        db.session.commit()

        # Adding some plays
        db.session.add_all(
            [Play(user_id = 1, letter_guessed = "a", is_correct = True, game_mode = 1),
            Play(user_id = 1, letter_guessed = "b", is_correct = True, game_mode = 1),
            Play(user_id = 1, letter_guessed = "c", is_correct = True, game_mode = 2),
            Play(user_id = 2, letter_guessed = "a", is_correct = True, game_mode = 1),
            Play(user_id = 2, letter_guessed = "a", is_correct = True, game_mode = 1)
            ])
        db.session.commit()

        # Adding some tokens
        db.session.add_all(
            [Token(user_id = 1, token_string "this is a login token"),
            Token(user_id = 1, token_string "this is another login token"),
            Token(user_id = 2, token_string "login token"),
            ])
        db.session.commit()        
        return

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        return
    #=========

    def test_user_backref(self):
        # Testing backref functionality
        jeff1 = User.query.filter_by(id = 1).first()
        jeff2 = Play.query.filter_by(user_id = 1).first().user
        jeff3 = Token.query.filter_by(user_id = 1).first().user

        tom1 = User.query.filter_by(id = 2).first()
        tom2 = Play.query.filter_by(user_id = 2).first().user
        tom3 = Token.query.filter_by(user_id = 2).first().user

        self.assertTrue(jeff1 == jeff2 == jeff3)
        self.assertTrue(tom1 == tom2 == tom3)
        self.assertFalse(jeff1 == tom1)
        return

    def test_password_hashing(self):
        # Testing password hashing is functional and not storing plaintext passwords
        jeff = db.session.query(User).get(1)
        self.assertFalse(jeff.password_hash == "I<322JumpStreet")

        self.assertTrue(jeff.check_password("I<322JumpStreet"))
        self.assertFalse(jeff.check_password("something-else-entirely"))
        return

