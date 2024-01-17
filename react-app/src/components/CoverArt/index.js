import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongsThunk } from '../../store/song';
import MusicHeader from '../MusicHeader';
import { IoPauseSharp } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";
// import UpdateSong from '../Update';
// import DeleteSong from '../Delete';
// import OpenModalButton from '../OpenModalButton';
import './CoverArt.css';

function CoverArt ({allSongs, onSrcChange, isPlaying, onPlayPause, onIsClicked, audioElem}) {
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
            </div>
            <div id="song-information-cont">
              <div id="cover-song-title">{song.title}</div>
              <div id="cover-song-artist">{song.artist}</div>
              <div id="cover-song-genre">{song.genre}</div>
            </div>
          </div>       
      )}) : ""}
    </div>
  );
};

export default CoverArt;


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



