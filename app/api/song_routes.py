from flask import Flask, render_template, redirect, request, url_for, Blueprint, session
from app.models import db, Song
from pprint import pprint
import os

song_routes = Blueprint('songs', __name__)


@song_routes.route('/', methods=['GET'])
def get_all_songs():
    return '<h1>Homepage</h1>'
    

@song_routes.route('/:songId', methods=['GET'])
def get_a_song(id):
    pass

@song_routes.route('/play/<filename>', methods=[])
def play_song():
    pass

@song_routes.route('/:songId/delete', methods=['DELETE'])
def remove_song(id):
    pass

@song_routes.route('/:songId/update', methods=['PUT'])
def update_song_information(id):
    pass



