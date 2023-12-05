from app.models import db
# from sqlalchemy.schema import Column, ForeignKey #This line isn't necessary because we import sqlalchemy through db 
# instead db.Column and db.ForeignKey
class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primaryKey=True)
    file_name = db.Column(db.String, nullable=False)
    title = db.Column(db.String(30), nullable=False)
    artist = db.Column(db.String(30))
    album = db.Column(db.String(30))
    genre = db.Column(db.String(20))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="songs")

    #Will create the to_dict() here

