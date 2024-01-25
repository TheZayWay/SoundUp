from .db import db, environment, SCHEMA, add_prefix_for_prod


class Album(db.Model):
    __tablename__ = "albums"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column()
    name = db.Column()
    

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
        
