from flask import render_template, Flask, flash, redirect, url_for, request
from app import app
from app import db
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user
from app.models import User, Play


#----------------------------------------------------------------------
## Routes to Information Pages
#----------------------------------------------------------------------

#home page
@app.route('/')
@app.route('/index')
def homepage():
    return render_template("homepage.html", footer_option = 'not fixed')

#about page
@app.route('/about')
def about():
    return render_template("about.html", footer_option = 'not fixed')

#learn page
@app.route('/learn')
def learn():
    return render_template("learn.html", footer_option = 'not fixed')

#stand alone function which queries the database to see how many plays the user has made 
def howManyPlays(id):
    print(id)
    user_play_num = Play.query.filter_by(user_id = id).count()
    return user_play_num


#profile page and option 1
@app.route('/profile')
def profile():
    user = current_user.display_name
    email = current_user.email
    UID = current_user.id
    num_plays = howManyPlays(UID)

    return render_template("profileStats_1.html", footer_option = 'not fixed', username= user, user_email = email, numPlay = num_plays)

#profile page option 2
@app.route('/profile_op2')
def profile_op2():
    user = current_user.display_name
    email = current_user.email
    UID = current_user.id
    num_plays = howManyPlays(UID)
    
    return render_template("profileStats_2.html", footer_option = 'not fixed', username= user, user_email = email, numPlay = num_plays)

#profile page option 3
@app.route('/profile_op3')
def profile_op3():
    user = current_user.display_name
    email = current_user.email
    UID = current_user.id
    num_plays = howManyPlays(UID)

    return render_template("profileStats_3.html", footer_option = 'not fixed', username= user, user_email = email, numPlay = num_plays)

#profile page option 4
@app.route('/profile_op4')
def profile_op4():
    user = current_user.display_name
    email = current_user.email
    UID = current_user.id
    num_plays = howManyPlays(UID)

    return render_template("profileStats_4.html", footer_option = 'not fixed', username= user, user_email = email, numPlay = num_plays)

#----------------------------------------------------------------------
## Routes to game pages
#----------------------------------------------------------------------

#read morse game mode
@app.route('/play/read')
def read():
    return render_template("read_morse.html", footer_option = 'fixed')

#write more game mode
@app.route('/play/write')
def write():
    return render_template("write_morse.html", footer_option = 'fixed')

#flashcards  game mode
@app.route('/play/flashcards')
def flashcards():
    return render_template("flashcards.html", footer_option = 'fixed')

#-----------------------------------------------------------------------
## Login and sign up pages
#-----------------------------------------------------------------------

#login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('homepage'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        return redirect(url_for('homepage'))
    return render_template("login.html", form=form)

#sign up page
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('homepage'))
    form = SignUpForm()
    if form.validate_on_submit():
        user = User(email=form.email.data, display_name=form.display_name.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('homepage'))
    return render_template("signup.html", form=form)

#logout page 
@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('homepage'))

#-----------------------------------------------------------------------
## Game data routes
#------------------------------------------------------------------------

#route to take data from the games and send to DB
@app.route('/takeGameData', methods=['GET', 'POST'])
def takeGameData():
    if request.method == 'POST':

        #take the relevant gaame data from the javascript files
        value = request.get_json()
        #userID = value[0]
        letter_guessed = value[0]
        is_correct = value[1]
        game_mode = value[2]       #game_mode, 1 = write, 2 = read, 3 = flashcards
        
        #send the data to the play database 
        if current_user.is_authenticated:
            userID = current_user.id #check  if correct

            game_data = Play(user_id = userID, letter_guessed = letter_guessed, is_correct = is_correct, game_mode = game_mode )
            db.session.add(game_data)
            db.session.commit()

            return('ok, data saved', 200)
        else:
            return('ok, anonymous user')
    else:
        return('0')
