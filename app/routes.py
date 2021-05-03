from flask import render_template, Flask
from app import app


app = Flask(__name__, template_folder='../app/templates')  # does this go here?


@app.route('/')
@app.route('/index')
def index():
    return render_template('homepage.html')
