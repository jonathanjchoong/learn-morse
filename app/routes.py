from app import app 
import sqlite3
from flask import render_template, Flask, request   
from app.models import Play 
from flask_login import current_user

#homepage
@app.route('/')
@app.route('/index')
def homepage():
    return render_template("homepage.html", footer_option = 'not fixed')

#read page
@app.route('/learn/read')
def read():
    return render_template("read_morse.html", footer_option = 'fixed')

#write page
@app.route('/learn/write')
def write():
    return render_template("write_morse.html", footer_option = 'fixed')

#flashcards  page
@app.route('/learn/flashcards')
def flashcards():
    return render_template("flashcards.html", footer_option = 'fixed')

#login page
@app.route('/login')
def login():
    return render_template("login.html", footer_option = 'fixed')

#signup page
@app.route('/signup')
def signup():
    return render_template("signup.html", footer_option = 'fixed')

#route to take data from the games and send to SQLite3
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
        if current_user.is_authenticated():
            userID = current_user.id #check  if correct
            game_data = Play(user_id = userID, letter_guessed = letter_guessed, is_correct = is_correct, game_mode = game_mode )
            db.session.add(game_data)
            db.session.commit()

            return('ok, data saved', 200)
        else:
            return('ok, anonymous user')
    else:
        return('0')