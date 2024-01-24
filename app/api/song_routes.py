from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Song, User
from pprint import pprint
import os

song_routes = Blueprint('songs', __name__)


#Get All Songs
@song_routes.route('/ok', methods=['GET'])
def get_all_songs_no_order():
    songs = Song.query.all()
    all_songs = []
    for song in songs:
        all_songs.append(song.to_dict())
    return all_songs, 200

@song_routes.route('/title', methods=['GET'])
def get_all_songs_by_title():
    ordered_songs = Song.query.order_by(Song.title)
    all_songs = []
    for song in ordered_songs:
        all_songs.append(song.to_dict()) 
    return all_songs   

@song_routes.route('/uploadedat', methods=['GET'])
def get_all_songs_by_upload_date():
    ordered_songs = Song.query.order_by(Song.uploaded_at)
    all_songs = []
    for song in ordered_songs:
        all_songs.append(song.to_dict()) 
    return all_songs 


#Get A Song
@song_routes.route('/<int:id>', methods=['GET'])
def get_song(id):
    song = Song.query.get(id)
    return song.to_dict()


#Get All Users Songs
@song_routes.route('/current', methods=['GET'])
def get_users_songs():
    songs = Song.query.all()
    users_songs = []
    for song in songs:
        if current_user.id == song.user_id:
            users_songs.append(song)
    return users_songs


# #Delete A Song (DB only)
# @song_routes.route('/<int:id>/delete/db', methods=['DELETE'])
# def remove_song_from_db(id):
#     song = Song.query.get(id)
#     if song:
#         db.session.delete(song)
#         db.session.commit()
#         print("Song deleted.")
#         return "Song deleted successfully."
#     else:
#         print(f"Couldn't find song with id: {id}")
#         return f"Couldn't find song with id: {id}", 404
        
    
    




