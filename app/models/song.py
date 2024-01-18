from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String, nullable=False)
    title = db.Column(db.String(30), nullable=False)
    artist = db.Column(db.String(30), nullable=True)
    album = db.Column(db.String(30), nullable=True)
    genre = db.Column(db.String(20), nullable=True)
    image = db.Column(db.String, nullable=True)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    file_path = db.Column(db.String, nullable=False)
    image_path = db.Column(db.String, nullable=True)

    user = db.relationship("User", back_populates="songs")

    #Public Attributes
    def to_dict(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "filepath": self.file_path,
            "title": self.title,
            "artist": self.artist,
            "album": self.album,
            "genre": self.genre,
            "image": self.image,
            "imagepath": self.image_path,
            "uploaded_at": self.uploaded_at,
            "user_id": self.user_id
        }

