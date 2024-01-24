import { IoTimeOutline } from "react-icons/io5";
import './MusicHeader.css'

function MusicHeader () {
  return (
    <div id="musicheader-cont">
      <div id="musicheader-title">Title</div>
      <div id="musicheader-artist">Artist</div>
      <div id="musicheader-album">Album</div>
      <div id="musicheader-genre">Genre</div>
      <div id="musicheader-duration">
        <IoTimeOutline size={18} />
      </div>
    </div>
  );
};

export default MusicHeader;