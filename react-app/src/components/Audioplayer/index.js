import { IoMdPlay } from "react-icons/io";
import { IoPlaySkipBackSharp } from "react-icons/io5";
import { IoPlaySkipForwardSharp } from "react-icons/io5";
import "./AudioPlayer.css";

function AudioPlayer () {
  return (  
    <div id="audioplayer-cont">
      <button className='audio-prevfor-btn'>
        <IoPlaySkipBackSharp />
      </button>
      <button id="audio-play-btn">
        <IoMdPlay />
      </button>
      <button className='audio-prevfor-btn'>
        <IoPlaySkipForwardSharp />
      </button>
    </div>
  );
};

export default AudioPlayer;
