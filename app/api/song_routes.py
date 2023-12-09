from flask import Flask, render_template, redirect, request, url_for, Blueprint, session
from app.models import db, Song
from pprint import pprint
import os

song_routes = Blueprint('songs', __name__)


#Get all songs

@song_routes.route('/', methods=['GET'])
def get_all_songs_no_order():
    songs = Song.query.all()
    all_songs = []
    for song in songs:
        all_songs.append(song.to_dict())
    return all_songs

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
    
    

@song_routes.route('/:songId', methods=['GET'])
def get_a_song(id):
    pass

@song_routes.route('/play/<filename>', methods=['GET'])
def play_song():
    pass

@song_routes.route('/:songId/delete', methods=['DELETE'])
def remove_song(id):
    pass

@song_routes.route('/:songId/update', methods=['PUT'])
def update_song_information(id):
    pass



