from flask import Blueprint, jsonify, session, request
from app.models import Album, db

album_routes = Blueprint('album', __name__)

@album_routes.route("/", methods=["GET"])
def get_all_albums():
  pass
