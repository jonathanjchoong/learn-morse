from flask import render_template, Flask, flash, redirect, url_for
from app import app
from app.forms import LoginForm, SignUpForm


@app.route('/')
@app.route('/index')
def homepage():
    return render_template("homepage.html")


@app.route('/learn/read')
def read():
    return render_template("read_morse.html")


@app.route('/learn/write')
def write():
    return render_template("write_morse.html")


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login requested for user {} remember_me={}'.format(
            form.email.data, form.remember_me.data))
        return redirect(url_for('homepage'))
    return render_template("login.html", form=form)


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignUpForm()
    if form.validate_on_submit():
        flash('Login requested for user {} remember_me={}'.format(
            form.email.data, form.remember_me.data))
        return redirect(url_for('homepage'))
    return render_template("signup.html", form=form)
