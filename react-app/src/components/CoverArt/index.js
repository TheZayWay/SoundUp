import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongsThunk } from '../../store/song';
import { IoPauseSharp } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";
// import UpdateSong from '../Update';
// import DeleteSong from '../Delete';
// import OpenModalButton from '../OpenModalButton';
import './CoverArt.css';

function CoverArt ({songsData, allSongs, onSrcChange, isPlaying, onPlayPause, onIsClicked, audioElem}) {
  const dispatch = useDispatch();
  const songsArr = useSelector((state) => state?.song?.allSongs);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [imageIndex, setImageIndex] = useState(null);

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch]);

  const handlePlayClicked = (idx) => {
    const src = allSongs[idx].filepath;
    if (isPlaying) {
      return;
    }

    if (!isPlaying) {
      onSrcChange(src);
      onPlayPause();
      onIsClicked();
      audioElem.current.audio.current.addEventListener('loadeddata', () => {
        audioElem.current.audio.current.play();
      });
    };
  };

  const handlePauseClicked = (idx) => {
    const src = allSongs[idx].filepath;
    onSrcChange(src);
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

  return (
    <div id="song-cont">
    {songsArr ? songsArr.map((song,idx) => { 
      return (
        <div onMouseLeave={handleHoverLeaveImage} id="cover-art-image-cont">
          <img 
            className="cover-art-image"
            key={idx} 
            src={song.imagepath} 
            alt=""
            onMouseEnter={() => handleHoverOverImage(idx)}
          ></img>

          {showPlayButton && !isPlaying && imageIndex === idx ? (
            <button id="playbtn" onClick={() => handlePlayClicked(idx)}>
              <IoMdPlay />
            </button>            
          ): "" }

          {showPlayButton && isPlaying && imageIndex === idx ? 
            <button id="pausebtn" onClick={() => handlePauseClicked(idx)}>
              <IoPauseSharp />
            </button>  
            : ""
        }

          {/* <div id="crud-modal-cont">
            <OpenModalButton 
              buttonText={"Update"}
              modalComponent={<UpdateSong song={song}/>}
            />
            <OpenModalButton 
              buttonText={"Delete"}
              modalComponent={<DeleteSong song={song}/>}
            />
          </div> */}
        </div>       
    )}) : ""}
    </div>
  );
};

export default CoverArt;
// {isPlaying ? (
//   <svg stroke="currentColor" fill="" strokeWidth="2" viewBox="0 0 24 20" strokeLinecap="round" strokeLinejoin="round" height="1.6em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" strokeWidth="0" fill="white"></path></svg>
// ) : (
//   <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>
// )}