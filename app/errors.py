from flask import render_template
from app import app, db


@app.errorhandler(404)
def not_found_error(error):
    return render_template("404.html", footer_option='not fixed', page_title="404 Error"), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template("500.html", footer_option='not fixed', page_title="500 Error"), 500
