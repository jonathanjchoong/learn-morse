from app import app 
from flask import render_template, Flask, redirect

@app.route('/index')
@app.route('/')
def homepage():
    return render_template("homepage.html")

@app.route('/learn/read')
def read():
    return render_template("read_morse.html")

@app.route('/learn/write')
def write():
    return render_template("write_morse.html")

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/signup')
def signup():
    return render_template("signup.html")


@app.route('/profile')
def profile():
    # if not_logged_in:
    #     return redirect("/login", code=302)
    return render_template("profile(graphing).html")
