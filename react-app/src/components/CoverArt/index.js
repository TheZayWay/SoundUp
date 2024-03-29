import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongsThunk } from '../../store/song';
import Options from '../MusicOption';
import MusicHeader from '../MusicHeader';
import OpenModalButton from "../OpenModalButton";
import UpdateSong from "../Update";
import DeleteSong from "../Delete";
import { IoPauseSharp } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import './CoverArt.css';

function CoverArt ({allSongs, onSrcChange, isPlaying, onPlayPause, onIsClicked, audioElem, currentSrc}) {
  const dispatch = useDispatch();
  const songsArr = useSelector((state) => state?.song?.allSongs);
  const userId = useSelector((state) => state?.session?.user?.id);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [imageIndex, setImageIndex] = useState(null);
  const [tripleDots, setTripleDots] = useState(false);

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch]);

  const handlePlayClicked = (idx) => {
    currentSrc = allSongs[idx].filepath;
    if (isPlaying) {
      return;
    }

    if (!isPlaying) {
      onSrcChange(currentSrc);
      onPlayPause();
      onIsClicked();
      audioElem.current.audio.current.play();
    };
  };

  const handlePauseClicked = (idx) => {
    currentSrc = allSongs[idx].filepath;
    onSrcChange(currentSrc);
    onPlayPause();
    onIsClicked();
    audioElem.current.audio.current.pause();
  };

  const handleHoverOverImage = (idx) => {
    setImageIndex(idx);
    setShowPlayButton(true); 
  };

  const handleHoverLeaveImage = () => {
    setShowPlayButton(false);
  };

  const handleTripleDots = (idx) => {
    setTripleDots((prev) => (prev && imageIndex === idx) ? false : true);
    setImageIndex(idx);
  };

  return (
    <div>
      <Options />
      <MusicHeader />
      {songsArr ? songsArr.map((song,idx) => { 
        return (
          <div onMouseLeave={handleHoverLeaveImage} id="cover-art-image-cont">
            <div id="image-btn-cont">
              <img 
                className="cover-art-image"
                key={idx} 
                src={song.imagepath} 
                alt=""
                onMouseEnter={() => handleHoverOverImage(idx)}
              ></img>
              <div id="button-cont">
                {showPlayButton && !isPlaying && imageIndex === idx ? <button id="playbtn" onClick={() => handlePlayClicked(idx)}>
                  <IoMdPlay />
                </button> : "" }
                {showPlayButton && isPlaying && imageIndex === idx ? <button id="pausebtn" onClick={() => handlePauseClicked(idx)}>
                  <IoPauseSharp />
                </button> : ""}
              </div>
            {userId === song.user_id ? (
              <div id="triple-dot-cont">
                <BsThreeDotsVertical onClick={() => {handleTripleDots(idx)}} id="threedots" />
                {tripleDots && imageIndex === idx ? <div id="crud-modal-cont">
                  <OpenModalButton 
                    buttonText={"Update"}
                    modalComponent={<UpdateSong song={song} />}
                  />
                  <OpenModalButton 
                    buttonText={"Delete"}
                    modalComponent={<DeleteSong song={song}/>}
                  />
                </div>  : ""}
              </div>)
            : ""}
            </div>
            <div id="song-information-cont">
              <div id="cover-song-title">{song.title}</div>
              <div id="cover-song-artist">{song.artist}</div>
              <div id="cover-song-album">{song.album}</div>
              <div id="cover-song-genre">{song.genre}</div>
              <div id="cover-song-duration">{song.duration}</div>
            </div>
          </div>       
      )}) : ""}
    </div>
  );
};

export default CoverArt;






