from app.models import db, environment, SCHEMA, Song
from sqlalchemy.sql import text


def seed_songs():
    song1 = Song(
        filename="The Well Tempered Clavier, Book I, BWV 846-869 - Prelude in Fugue No.2 in C minor.mp3",
        title="Prelude in Fugue No.2",
        artist="",
        album="",
        genre="Classical",
        image="download.jpeg",
        user_id=1,
        file_path="uploads/The_Well_Tempered_Clavier_Book_I_BWV_846-869_-_Prelude_in_Fugue_No.2_in_C_minor.mp3",
        image_path="images/download.jpeg"
        )
    song2 = Song(
        filename="Etude Op. 25 no. 4 in A minor - 'Paganini'.mp3",
        title="Paganini",
        artist="",
        album="",
        genre="Classical",
        image="San Francisco.jpeg",
        user_id=2,
        file_path="uploads/Etude_Op._25_no._4_in_A_minor_-_Paganini.mp3",
        image_path="images/San_Francisco.jpeg"
        )
    song3 = Song(
        filename="Violin Concerto in G minor, RV 315 'Summer'.mp3",
        title="Summer",
        artist="",
        album="",
        genre="Classical",
        image="nathan-queloz-N5hC0TDC3LA-unsplash.jpg",
        user_id=3,
        file_path="uploads/Violin_Concerto_in_G_minor_RV_315_Summer.mp3",
        image_path="images/nathan-queloz-N5hC0TDC3LA-unsplash.jpg"
        )
    song4 = Song(
        filename="Piano Sonata no. 14 in C#m 'Moonlight', Op. 27 no. 2 - I. Adagio sostenuto.mp3",
        title="Moonlight",
        artist="",
        album="",
        genre="Classical",
        image="arthur-debons-GKwWs_PiEMw-unsplash.jpg",
        user_id=1,
        file_path="uploads/Piano_Sonata_no._14_in_Cm_Moonlight_Op._27_no._2_-_I._Adagio_sostenuto.mp3",
        image_path="images/arthur-debons-GKwWs_PiEMw-unsplash.jpg"
        )
    song5 = Song(
        filename="Nocturne in B flat minor, Op. 9 no. 1.mp3",
        title="Nocturne",
        artist="",
        album="",
        genre="Classical",
        image="susan-wilkinson-FlKis6BzvRo-unsplash.jpg",
        user_id=2,
        file_path="uploads/Nocturne_in_B_flat_minor_Op._9_no._1.mp3",
        image_path="images/susan-wilkinson-FlKis6BzvRo-unsplash.jpg"
        )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.commit()
    

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
        
    db.session.commit()