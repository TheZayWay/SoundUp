import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongsThunk } from '../../store/song';
// import UpdateSong from '../Update';
// import DeleteSong from '../Delete';
// import OpenModalButton from '../OpenModalButton';
import './CoverArt.css';

function CoverArt ({songsData, allSongs, onSrcChange}) {
  const dispatch = useDispatch();
  const songsArr = useSelector((state) => state?.song?.allSongs);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [imageIndex, setImageIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch]);

  const handlePlayPause = (idx,song) => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      const src = allSongs[idx].filepath;
      onSrcChange(src)
    } else {
      const src = undefined;
      onSrcChange(src)
    }
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
          {showPlayButton && imageIndex === idx ? 
            <button id="playbtn" onClick={() => handlePlayPause(idx)}>
              <svg stroke="currentColor" fill="" stroke-width="2" viewBox="0 0 24 20" stroke-linecap="round" stroke-linejoin="round" height="1.6em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" stroke-width="0" fill="white"></path></svg>
            </button>
          : "" }
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
