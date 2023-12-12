from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FileField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class UploadSongForm(FlaskForm):
    filename = FileField('File', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    artist = StringField('Artist')
    album = StringField('Album')
    genre = SelectField(
        'Genre', 
        choices=[('Hip-Hop', 'Hip-Hop'),('Rap', 'Rap'),('Pop', 'Pop'),
                 ('RnB', 'RnB'),('Country', 'Country'),('EDM', 'EDM'),
                 ('Classical', 'Classical'),('Jazz', 'Jazz'),('Rock', 'Rock'),
                 ('Reggae', 'Reggae',),('Alternative', 'Alternative')])
    image = StringField('Image', validators=[DataRequired()])
    upload = SubmitField('Upload')

    
