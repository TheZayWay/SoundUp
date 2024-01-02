from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')
    if "@" not in email:
        raise ValidationError('Email address is not valid.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    if len(username) < 6:
        raise ValidationError('Name must be greater than 6 characters.')

def password_check(form, field):
    password = field.data
    if len(password) < 6:
        raise ValidationError('Password must be greater than 6 characters.')

class SignUpForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    password = StringField('password', validators=[DataRequired(), password_check])