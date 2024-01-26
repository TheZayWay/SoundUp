from flask import Blueprint 
from app.models.album import Album
from app.models import db

album_routes = Blueprint('album', __name__)

@album_routes.route("/", methods=["GET"])
def get_all_albums():
  albums = Album.query.all()
  all_albums = []
  for album in albums:
    all_albums.append(album.to_dict())
  return all_albums, 200



