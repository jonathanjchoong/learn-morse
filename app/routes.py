from flask import render_template, Flask, flash, redirect, url_for
from app import app
from app import db
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user
from app.models import User


@app.route('/')
@app.route('/index')
def homepage():
    return render_template("homepage.html", footer_option = 'not fixed')


@app.route('/about')
def about():
    return render_template("about.html")


@app.route('/learn')
def learn():
    return render_template("learn.html")


@app.route('/play/read')
def read():
    return render_template("read_morse.html", footer_option = 'fixed')


@app.route('/play/write')
def write():
    return render_template("write_morse.html", footer_option = 'fixed')

@app.route('/learn/flashcards')
def flashcards():
    return render_template("flashcards.html", footer_option = 'fixed')


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


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('homepage'))
