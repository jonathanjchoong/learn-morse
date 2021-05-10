from app import app 
from flask import render_template, Flask, request   


@app.route('/')
@app.route('/index')
def homepage():
    return render_template("homepage.html", footer_option = 'not fixed')

@app.route('/learn/read')
def read():
    return render_template("read_morse.html", footer_option = 'fixed')

@app.route('/learn/write')
def write():
    return render_template("write_morse.html", footer_option = 'fixed')

@app.route('/learn/flashcards')
def flashcards():
    return render_template("flashcards.html", footer_option = 'fixed')

@app.route('/login')
def login():
    return render_template("login.html", footer_option = 'fixed')

@app.route('/signup')
def signup():
    return render_template("signup.html", footer_option = 'fixed')

@app.route('/takeGameData', methods=['GET', 'POST'])
def takeGameData():
    if request.method == 'POST':
        value = request.get_json()
        print(value)
        return('ok', 200)
    else:
        return('0')