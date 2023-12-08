from app.models import db
from datetime import datetime

class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String, nullable=False)
    title = db.Column(db.String(30), nullable=False)
    artist = db.Column(db.String(30))
    album = db.Column(db.String(30))
    genre = db.Column(db.String(20))
    image = db.Column(db.String, nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="songs")

    #Public Attributes
    def to_dict(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "title": self.title,
            "artist": self.artist,
            "album": self.album,
            "genre": self.genre,
            "image": self.image,
            "uploaded_at": self.uploaded_at,
            "user_id": self.user_id
        }

