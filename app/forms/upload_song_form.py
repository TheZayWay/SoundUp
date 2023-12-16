from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FileField, SubmitField
from wtforms.validators import DataRequired, ValidationError

## If the validations dont show on front end try taking out self
## and get rid of .data.filename and see if that works 
def allowed_file(self,field):
    allowed_extensions = {'mp3', 'wav', 'flac'}
    if '.' in field.data.filename and field.data.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
        raise ValidationError("Invalid file format. Only PNG, JPG, and JPEG are allowed.")

def allowed_image(self,field):
    if field.data:
        allowed_extensions = {'png', 'jpeg', 'jpg'}
        if '.' in field.data.filename and field.data.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
            raise ValidationError("Invalid file format. Only PNG, JPG, and JPEG are allowed.")
    else:
         pass


class UploadSongForm(FlaskForm):
    filename = FileField('File', validators=[DataRequired(), allowed_file])
    title = StringField('Title', validators=[DataRequired()])
    artist = StringField('Artist')
    album = StringField('Album')
    genre = SelectField(
        'Genre', 
        choices=[('Hip-Hop', 'Hip-Hop'),('Rap', 'Rap'),('Pop', 'Pop'),
                 ('RnB', 'RnB'),('Country', 'Country'),('EDM', 'EDM'),
                 ('Classical', 'Classical'),('Jazz', 'Jazz'),('Rock', 'Rock'),
                 ('Reggae', 'Reggae',),('Alternative', 'Alternative')])
    image = FileField('Image', validators=[allowed_image])
    upload = SubmitField('Upload')

    
