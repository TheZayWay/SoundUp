import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useModal } from "../../context/Modal";
import { updateSongThunk, getAllSongsThunk } from "../../store/song";
import './Update.css'

function UpdateSong ({song}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  let songId = song.id;
  const [filename, setFilename] = useState(song.filename);
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist);
  const [album, setAlbum] = useState(song.album);
  const [genre, setGenre] = useState(song.genre);
  const [image, setImage] = useState(song.image);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const songData = {
      filename,
      title,
      artist,
      album,
      genre,
      image
    };
    await dispatch(updateSongThunk(songData, songId));
    setIsLoaded(true);
    closeModal();
  }
  

  useEffect(() => {
    dispatch(getAllSongsThunk())
    setIsLoaded(false);
  }, [dispatch, isLoaded])

  return (
    <div id="upload-form-cont">
      <form id="upload-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h1>Update song</h1>
        <div className="upload-divs">
          <span id="upload-inputs-title-song">Song</span>
          <label htmlFor="file-input" className="custom-file-label">
            Choose File
          </label>
          <input 
            type="file"
            name="filename"
            onChange={(e) => setFilename(e.target.files[0])}    
            className="file-input"
            id="file-input"
          />
        </div>
        <span style={{color:"white", fontSize: "0.7rem", marginTop: "0.5rem"}}>{filename?.name}</span>
        <div>
          <span className="upload-inputs-title">Title</span>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="upload-inputs"
          />
        </div>   
        <div>
          <span className="upload-inputs-title">Artist</span>
          <input 
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist"
            className="upload-inputs"
          />
        </div>        
        <div>
          <span className="upload-inputs-title">Album</span>
          <input 
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="Album"
            className="upload-inputs"
          />
        </div>
        <div>
          <span id="upload-inputs-title-genre">Genre</span>
          <select id="upload-select" type="text" value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option>Select...</option>
            <option>Hip-Hop</option>
            <option>Rap</option>
            <option>Pop</option>
            <option>RnB</option>
            <option>Country</option>
            <option>EDM</option>
            <option>Classical</option>
            <option>Jazz</option>
            <option>Rock</option>
            <option>Reggae</option>
            <option>Alternative</option>
          </select>
        </div>      
        <div className="upload-divs">
          <span id="upload-inputs-title-image">Image</span>
          <label htmlFor="image-input" className="custom-file-label">
            Choose File
          </label>
          <input 
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="file-input"
            id="image-input"
          />
        </div>
        <span style={{color:"white", fontSize: "0.7rem", marginTop: "0.5rem"}}>{image?.name}</span>
        <button id="upload-btn" type="submit">Update</button>
      </form> 
    </div>
  );
};

export default UpdateSong;