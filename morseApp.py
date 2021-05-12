from app import app, db
from app.models import User, Play, Token

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Post': Play, 'Token': Token}