from .db import db, environment, SCHEMA, add_prefix_for_prod

class Album(db.Model):
    __tablename__ = "albums"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30))
    
    songs = db.relationship("Song", back_populates="albums")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
        
