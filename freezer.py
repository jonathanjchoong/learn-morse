# This file implements Frozen-Flask, which converts the flask app
# to a static site.
# https://pythonhosted.org/Frozen-Flask/

from flask_frozen import Freezer
from app import app

freezer = Freezer(app)

if __name__ == '__main__':
    freezer.freeze()