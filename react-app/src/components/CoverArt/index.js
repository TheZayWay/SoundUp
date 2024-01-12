import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongsThunk } from '../../store/song';
import UpdateSong from '../Update';
import DeleteSong from '../Delete';
import OpenModalButton from '../OpenModalButton';
import { IoMdPlay } from "react-icons/io";
import './CoverArt.css';

function CoverArt () {
  const dispatch = useDispatch();
  const songsArr = useSelector((state) => state?.song?.allSongs);
  const [picIndex, setPicIndex] = useState();

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch]);
  
  const handleMouseOver = (idx) => {
    setPicIndex(idx);
  }

  const handleMouseLeave = () => {
    setPicIndex(false);
  }

  // const handlePlayButtonClick = () => {

  // }

  return (
    <>
      {songsArr ? songsArr.map((song,idx) => { 
        return (
          <div id="cover-art-image-cont">
            <img 
              className='cover-art-image' 
              key={idx} 
              src={song.imagepath} 
              alt=''
              onMouseOver={() => handleMouseOver(idx)} 
              onMouseLeave={() => handleMouseLeave()}
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
            {idx === picIndex ? <button id="play-btn"><IoMdPlay/></button> : "" }
          </div>         
      )}) : ""}   
    </>
  )
};

export default CoverArt;
