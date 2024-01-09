from flask import Flask, render_template, request, session, redirect, send_from_directory, send_file, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, current_user
from werkzeug.utils import secure_filename
from s3_helpers import upload_to_s3, delete_file_from_s3
from .models import db, User, Song
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.song_routes import song_routes
from .forms.upload_song_form import UploadSongForm
from .seeds import seed_commands
from .config import Config
from pprint import pprint
import os
S3_LOCATION = f"http://soundupbucket.s3.amazonaws.com/"

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)
app.config.from_object(Config)

app.config['UPLOAD_FOLDER'] = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'Uploads')
app.config['IMAGE_FOLDER'] = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'Images')
app.config['ALLOWED_EXTENSIONS'] = {'mp3', 'wav', 'flac'}
app.config['ALLOWED_IMAGES']  = {'png', 'jpeg', 'jpg'}

### UPLOADS ROUTES & METHODS ###

## UPLOAD METHODS ##

#Boolean Checks If File Is Allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def allowed_image(image):
    return '.' in image and image.rsplit('.', 1)[1].lower() in app.config['ALLOWED_IMAGES']


#Saves Approved Files/Images Through app.config
def save_song(file, filename, upload_folder):
    if filename and allowed_file(filename):
        
        secured_filename = secure_filename(filename) 
        file_path = os.path.join(upload_folder, secured_filename)
        os.makedirs(upload_folder, exist_ok=True)
        file.save(file_path)

        if os.path.exists(file_path):
            print(f"FILE PATH: {file_path} does exist !!")
            return file_path
        else:
            print(f"FILE PATH: {file_path} doesn't exist.") 
    else:
        return None

def save_image(image, image_name, image_folder):
  if image_name and allowed_image(image_name):
      
      secured_filename = secure_filename(image_name) 
      image_path = os.path.join(image_folder, secured_filename)
      os.makedirs(image_folder, exist_ok=True)
      image.save(image_path)   

      if os.path.exists(image_path):
          print(f"IMAGE PATH: {image_path} does exist !!")
          return image_path
      else:
          print(f"IMAGE PATH: {image_path} doesn't exist.") 
  else:
      return None
    

# Removes An Upload/Image From Respective Directories    
def remove_from_uploads(id):
    song = Song.query.get(id).filename
    transformed_song = song.replace(' ', '_').replace(',', '').replace("'", '').replace("#", '').replace('(', '').replace(')', '')

    root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    file_path = app.config['UPLOAD_FOLDER'] + '/' + transformed_song
    if file_path:
        os.remove(file_path)
        print(f"FILE PATH {file_path} was removed!!")
    
    print(f"{song} was succesfully deleted from /uploads.")
    return f"{song} was successfully deleted from /uploads."

def remove_from_images(id):
    image = Song.query.get(id).image
    transformed_image = image.replace(' ', '_').replace(',', '').replace("'", '')

    root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    image_path = app.config['IMAGE_FOLDER'] + '/' + transformed_image
    os.remove(image_path)

    print(f"IMAGE PATH {image_path} was removed")
    print(f"{image} was successfully deleted from /images")
    return f"{image} was successfully deleted from /images"

## UPLOAD ROUTES ##

#Upload Song
@app.route('/api/songs/upload', methods=['POST'])
def upload_song():
  form = UploadSongForm()
  file = request.files['filename']
  image = request.files['image']

  if file:
      filename = file.filename
      upload_to_s3(file)
      file_path = S3_LOCATION + file.filename      
  else:
      file_path = None

  if image:
      image_name = image.filename
      upload_to_s3(image)
      image_path = S3_LOCATION + image.filename
  else:
      image_path = None

  if file:
      song = Song(
          filename = filename,
          title = form.data['title'],
          artist = form.data['artist'],
          album = form.data['album'],
          genre = form.data['genre'],
          image = image_name or None if image_name == "<FileStorage: '' ('application/octet-stream')>" else image_name,
          file_path = file_path,
          image_path = image_path
      )     
      db.session.add(song)
      db.session.commit()
      print(f"Added Song to database.")
      return song.to_dict()
  else:
      print(f"Could not add Song to database.")
      return jsonify({"error": "Internal Server Error"}), 500
    

#Update Song
@app.route('/api/songs/<int:id>/update', methods=['POST', 'PUT', 'GET'])
def update_song_information(id):
    form = UploadSongForm()
    song_in_db = Song.query.get(id)

    if request.method == 'GET':
        return render_template('update_song.html', form=form)
    
    if request.method in ['PUT', 'POST'] and form.validate_on_submit():
        
        remove_from_uploads(id)
        delete_file_from_s3('soundupbucket', song_in_db.filename)
        file = request.files['filename']   
        filename = file.filename         
        file_path = save_song(file, filename, app.config['UPLOAD_FOLDER'])
        file_url = upload_to_s3(file, 'soundupbucket')
        image = request.files['image']
        if image:
            if song_in_db.image != "":
                remove_from_images(id)
                delete_file_from_s3('soundupbucket', song_in_db.image)
            image_name = image.filename
            image_path = save_image(image, image_name, app.config['IMAGE_FOLDER'])
            image_url = upload_to_s3(image, 'soundupbucket')
        else:
            image_name = song_in_db.image
            image_path = song_in_db.image_path

        song_to_update = Song.query.get(id)
        song_to_update.filename = filename
        
        song_to_update.title = form.data['title']
        song_to_update.artist = form.data['artist']
        song_to_update.album = form.data['album']
        song_to_update.genre = form.data['genre']
        song_to_update.image = image_name
        song_to_update.file_path = file_path
        song_to_update.image_path = image_path
        db.session.commit()
        print(f"Updated Song in database.")
        return song_to_update.to_dict()
    else:
        return render_template('update_song.html', form=form)


#Play Song 
@app.route('/api/songs/play/uploads/<path:filename>', methods=['GET'])
def play_song(filename):
  """
  App root is variable for os path till app
  File path is the absolute path which is necessary 
  for send_file or send_from_directory 
  """
  root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
  file_path = root + '/' + app.config['UPLOAD_FOLDER'] + '/' + filename
  # return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
  return send_file(file_path, as_attachment=True)

@app.route('/api/songs/audio_player', methods=['GET'])
def audio_player():
  root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
  file_path = root + '/' + app.config['UPLOAD_FOLDER']
  file_names = os.listdir(file_path)
  return render_template('audio_player.html', file_names=file_names)


# Deletes Song 
@app.route('/api/songs/<int:id>/delete', methods=['GET','DELETE'])
def delete_song_from_db(id):
  song_for_db = Song.query.get(id)
  filename = song_for_db.filename
  image_name = song_for_db.image

  delete_file_from_s3('soundupbucket', filename)
  
  if song_for_db.image != "" and song_for_db.image_path != None:
      delete_file_from_s3('soundupbucket', image_name)
  
  db.session.delete(song_for_db)
  db.session.commit()
  print(f"{filename} was succesfully deleted from uploads w/ image and DB")
  return f"{filename} was successfully deleted from uploads w/ image and DB."


app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(song_routes, url_prefix='/api/songs')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

#Request converted from http to https
@app.before_request
def https_redirect():
  if os.environ.get('FLASK_ENV') == 'production':
      if request.headers.get('X-Forwarded-Proto') == 'http':
          url = request.url.replace('http://', 'https://', 1)
          code = 301
          return redirect(url, code=code)
    
#Injects csrf token in response
@app.after_request
def inject_csrf_token(response):
  response.set_cookie(
      'csrf_token',
      generate_csrf(),
      secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
      samesite='Strict' if os.environ.get(
          'FLASK_ENV') == 'production' else None,
      httponly=True)
  return response

#Show all backend APIs/ doc or null on browser
@app.route("/api/docs")
def api_help():
  """
  Returns all API routes and their doc strings
  """
  acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                  app.view_functions[rule.endpoint].__doc__ ]
                  for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
  return route_list


@app.route('/favicon.ico')
def favicon():
  return '', 204


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
  """
  This route will direct to the public directory in our
  react builds in the production environment for favicon
  or index.html requests
  """
  if path == 'favicon.ico':
      return app.send_from_directory('public', 'favicon.ico')
  # return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
  return app.send_static_file('index.html')


