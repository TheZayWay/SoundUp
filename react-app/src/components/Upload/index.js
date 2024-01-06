import { useState } from "react";
import { uploadSongThunk } from "../../store/song";
import { useDispatch } from "react-redux";

function UploadSong () {
  const dispatch = useDispatch();
  const [filename, setFilename] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  
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
    return await dispatch(uploadSongThunk(songData));
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input 
          type="file"
          name="filename"
          onChange={(e) => setFilename(e.target.files[0])}
        />
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input 
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />
        <select type="text" value={genre} onChange={(e) => setGenre(e.target.value)}>
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
        <input 
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form> 
    </div>
  )
};

export default UploadSong;