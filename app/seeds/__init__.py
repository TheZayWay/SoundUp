from flask.cli import AppGroup
from .users import seed_users, undo_users
# from .songs import seed_songs, undo_songs
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        # undo_songs()
        undo_users()
    seed_users()
    # seed_songs()


@seed_commands.command('undo')
def undo():
    # undo_songs()
    undo_users()
    