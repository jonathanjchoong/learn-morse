from flask import render_template, Flask, flash, redirect, url_for, request
from app import app
from app import db
import json

# ----------------------------------------------------------------------
# Routes to Information Pages
# ----------------------------------------------------------------------

# home page


@app.route('/index')
@app.route('/')
def homepage():
    return render_template("homepage.html", footer_option='not fixed', page_title="Learn Morse")

# about page


@app.route('/about')
def about():
    return render_template("about.html", footer_option='not fixed', page_title="Learn Morse - About")

# learn page


@app.route('/learn')
def learn():
    return render_template("learn.html", footer_option='not fixed', page_title="Learn Morse - Learn")

# profile page and option 1

@app.route('/play/read')
def read():
    return render_template("read_morse.html", footer_option='fixed', page_title="Learn Morse - Read")

# write more game mode


@app.route('/play/write')
def write():
    return render_template("write_morse.html", footer_option='fixed', page_title="Learn Morse - Write")

# flashcards  game mode


@app.route('/play/flashcards')
def flashcards():
    return render_template("flashcards.html", footer_option='fixed', page_title="Learn Morse - Flashcards")

# listen game mode


@app.route('/play/listen')
def listen():
    return render_template("listen.html", footer_option='fixed', page_title="Learn Morse - Listen")


# # -----------------------------------------------------------------------
# # Login and sign up pages
# # -----------------------------------------------------------------------

# # login page
# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if current_user.is_authenticated:
#         return redirect(url_for('homepage'))
#     form = LoginForm()
#     if form.validate_on_submit():
#         user = User.query.filter_by(email=form.email.data).first()
#         if user is None or not user.check_password(form.password.data):
#             flash('Invalid username or password')
#             return redirect(url_for('login'))
#         login_user(user, remember=form.remember_me.data)
#         return redirect(url_for('homepage'))
#     return render_template("login.html", form=form, page_title="Learn Morse - Login")

# # sign up page


# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     if current_user.is_authenticated:
#         return redirect(url_for('homepage'))
#     form = SignUpForm()
#     if form.validate_on_submit():
#         user = User(email=form.email.data,
#                     display_name=form.display_name.data, avatar_id=0)
#         user.set_password(form.password.data)
#         db.session.add(user)
#         db.session.commit()
#         login_user(user, remember=form.remember_me.data)
#         return redirect(url_for('homepage'))
#     return render_template("signup.html", form=form, page_title="Learn Morse - Signup")

# # logout page


# @app.route('/logout')
# def logout():
#     logout_user()
#     return redirect(url_for('homepage'))

# # -----------------------------------------------------------------------
# # Game data routes
# # ------------------------------------------------------------------------

# # route to take data from the games and send to DB


# @app.route('/takeGameData', methods=['GET', 'POST'])
# def takeGameData():
#     if request.method == 'POST':

#         # take the relevant gaame data from the javascript files
#         value = request.get_json()
#         #userID = value[0]
#         letter_guessed = value[0]
#         is_correct = value[1]
#         game_mode = value[2]  # game_mode, 1 = write, 2 = read, 3 = flashcards

#         # send the data to the play database
#         if current_user.is_authenticated:
#             userID = current_user.id  # check  if correct

#             game_data = Play(user_id=userID, letter_guessed=letter_guessed,
#                              is_correct=is_correct, game_mode=game_mode)
#             db.session.add(game_data)
#             db.session.commit()

#             return('ok, data saved', 200)
#         else:
#             return('ok, anonymous user')
#     else:
#         return('0')

# # route to change which avatar a person has selected in the database


# @app.route('/avatarChange', methods=['GET', 'POST'])
# def avatarChange():
#     print('ok')
#     if request.method == 'POST':
#         value = request.get_json()
#         uid = current_user.id
#         entry = User.query.get(uid)
#         entry.avatar_id = value
#         db.session.commit()
#         return ('ok avatar updated')
#     else:
#         return 'not updated, failed'

# @app.route('/profile')
# def profile():
#     if not current_user.is_authenticated:
#         return redirect(url_for('login'))
#     user = current_user.display_name
#     email = current_user.email
#     user_avatar = current_user.avatar_id

#     player_data = [[entry.id, entry.letter_guessed, entry.is_correct, entry.game_mode]
#                    for entry in Play.query.filter_by(user_id=current_user.id).all()]
#     return render_template("profile(graphing).html", footer_option='not fixed', username=user, user_email=email, player_data=player_data, avatar=user_avatar, page_title="Learn Morse - Profile")


# @app.route('/avatar')
# def avatar():
#     return render_template("avatarChange.html")
# # ----------------------------------------------------------------------
# # Routes to game pages
# # ----------------------------------------------------------------------

# # read morse game mode