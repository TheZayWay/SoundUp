import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, current_user
from werkzeug.utils import secure_filename
from .models import db, User, Song
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.song_routes import song_routes
from .forms.upload_song_form import UploadSongForm
from .seeds import seed_commands
from .config import Config
from pprint import pprint 

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')
# app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)
app.config.from_object(Config)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_EXTENSIONS'] = {'mp3', 'wav', 'flac'}  

#Boolean Checks If File Is Allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

#Saves Approved Files To Upload Folder through app.config
def save_song(file, filename):
    if filename and allowed_file(filename):
        secured_filename = secure_filename(filename) 
        upload_file_path = app.config['UPLOAD_FOLDER']
        file_path = os.path.join(upload_file_path, secured_filename)
        file.save(file_path)
        if os.path.exists(file_path):
            print(f"FILE PATH: {file_path} does exist !!")
            return file_path
        else:
            print(f"FILE PATH: {file_path} doesn't exist.") 
    else:
        return None
    
#Upload Route
@app.route('/api/songs/upload', methods=['POST'])
def upload_song():
    form = UploadSongForm()
    file = request.files['filename']   
    filename = file.filename            
    file_path = save_song(file, filename)
    
    if file_path:
        song = Song(
            filename = filename,
            title = form.data['title'],
            artist = form.data['artist'],
            album = form.data['album'],
            genre = form.data['genre'],
            image = form.data['image'],
            file_path = file_path
        )        
        db.session.add(song)
        db.session.commit()
        print(f"Added Song to database.")
        return song.to_dict()
    else:
        print(f"Could not add Song to database.")
        return "Song not added."

#Upload Test Route 
@app.route('/api/songs/upload', methods=['GET'])
def render_song_upload():
    form = UploadSongForm()
    return render_template('upload_song.html', form=form)


app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(song_routes, url_prefix='/api/songs')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


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
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')



    
    
