import { useState, useRef, useEffect } from "react";
import { IoMdPlay } from "react-icons/io";
import { IoPlaySkipBackSharp } from "react-icons/io5";
import { IoPlaySkipForwardSharp } from "react-icons/io5";
import { IoPauseSharp } from "react-icons/io5";
import "./AudioPlayer.css";

function AudioPlayer ({songsData}) {  
  const [songs, setSongs] = useState(songsData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsData[3]);
  console.log(songsData, "SONGSD")
  
  const playOrPause = () => {
    setIsPlaying(!isPlaying);
  }
  
  let audioElem = useRef(null);

  useEffect(() => {
      if (isPlaying) {
        if (audioElem.current !== null) { 
          audioElem.current.play();
        }
      } else {
        if (audioElem.current !== null) {
          audioElem.current.pause();
        }
      }
  }, [isPlaying]);
  
  return ( 
    <>
      <div id="audioplayer-cont">
        <button className='audio-prevfor-btn'>
          <IoPlaySkipBackSharp />
        </button>
        {songsData && songsData.length > 0 && currentSong && (
          <audio src={currentSong} ref={audioElem} />
        )}
        <button onClick={playOrPause} id="audio-playpause-btn">
          {isPlaying ? <IoPauseSharp /> : <IoMdPlay />}
        </button>
        <button className='audio-prevfor-btn'>
          <IoPlaySkipForwardSharp />
        </button>
      </div>  
    </> 
  );
};
// 
export default AudioPlayer;
