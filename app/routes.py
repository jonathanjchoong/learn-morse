from app import app 
from flask import render_template, Flask


@app.route('/')
@app.route('/index')
def test():
    return render_template('v2WriteMorsePage.html')