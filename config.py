import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__)) # Getting the file directory of the server folder
load_dotenv(os.path.join(basedir, '.flaskenv'))

class BaseConfig(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or "a-super-duper-secure-key-nobody-knows!"
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or 'sqlite:///' + os.path.join(basedir, 'app.db') # If shell variable is undefined, will point to a local SQL 
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(BaseConfig):
    pass # TODO: Implement later, once variables are stored
    # ENV='production'
    # SECRET_KEY = os.environ['SECRET_KEY'] # Will raise an exception if shell variable is undefinied (unlike the .get method)
    # SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

class DevelopmentConfig(BaseConfig):
    # FLASK_ENV = 'development'
    # FLASK_DEBUG = True
    ENV = 'development'
    DEBUG = True

class TestingConfig(BaseConfig):
    ENV='testing'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:' #in memory database

# ! For some reason, the config options aren't sticking when being applied to the app.
# ! Troubleshoot if debug is working as expectedfa

