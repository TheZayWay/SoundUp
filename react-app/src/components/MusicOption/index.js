import { useHistory } from 'react-router-dom';
import './MusicOption.css'

function Options () {
  const history = useHistory();

  const handleSongs = () => {
    history.push("/");
  }

  const handleAlbums = () => {
    alert("Albums coming soon...")
  }
  
  const handleArtist = () => {
    alert("Artist coming soon...")
  }

  return (
    <>
      <div id="options-music-cont">
        <button id="musicoption-songs" onClick={handleSongs}>Songs</button>
        <button id="musicoption-albums" onClick={handleAlbums}>Albums</button>
        <button id="musicoption-artist" onClick={handleArtist}>Artist</button>
      </div>
    </>
  );
};

export default Options;