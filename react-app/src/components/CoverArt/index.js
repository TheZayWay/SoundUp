import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongsThunk } from '../../store/song';
import UpdateSong from '../Update';
import DeleteSong from '../Delete';
import OpenModalButton from '../OpenModalButton';
import './CoverArt.css';

function CoverArt () {
  const dispatch = useDispatch();
  const songsArr = useSelector((state) => state?.song?.allSongs);

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch]);

  return (
    <div id="song-cont">
      {songsArr ? songsArr.map((song,idx) => { 
        return (
          <div id="cover-art-image-cont">
            <img 
              className='cover-art-image' 
              key={idx} 
              src={song.imagepath} 
              alt=''
            ></img>
            <div id="crud-modal-cont">
              <OpenModalButton 
                buttonText={"Update"}
                modalComponent={<UpdateSong song={song}/>}
              />
              <OpenModalButton 
                buttonText={"Delete"}
                modalComponent={<DeleteSong song={song}/>}
              />
            </div>
          </div>         
      )}) : ""}
    </div>
  )
};

export default CoverArt;
// {/* { idx === picIndex ? <button onClick={handleClick} id="play-btn"><IoMdPlay/></button> : "" } */}
// import { IoMdPlay } from "react-icons/io";