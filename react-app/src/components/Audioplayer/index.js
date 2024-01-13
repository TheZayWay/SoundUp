import { useState, useRef } from "react";
import { IoMdPlay } from "react-icons/io";
import { IoPlaySkipBackSharp } from "react-icons/io5";
import { IoPlaySkipForwardSharp } from "react-icons/io5";
import { IoPauseSharp } from "react-icons/io5";
import MyAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./AudioPlayer.css";

function AudioPlayer ({songsData, allSongs}) {  
  // const [songs, setSongs] = useState(allSongs);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(allSongs[3].filepath);
 
  let songTitle;
  let songArtist;
  if (currentSong.includes(allSongs[3].title)) {
    songTitle = allSongs[3].title
    songArtist = allSongs[3].artist
  }

  const customIcons = {
    play: <IoMdPlay size={32} color="rgb(255,255,255)"/>,
    pause: <IoPauseSharp size={32} color="rgb(255,255,255"/>,
    previous: <IoPlaySkipBackSharp size={22} color="rgb(255,255,255"/>,
    next: <IoPlaySkipForwardSharp size={22} color="rgb(255,255,255"/>
  }

  const playerStyles = {
    backgroundColor: 'transparent',
    width: '500px', 
  }

  let audioElem = useRef(null);
   
  return ( 
    <>
      <div id="audioplayer-cont">
        <div id="audio-content">
          <img id="song-image" src={allSongs[3].imagepath} alt=""></img>
          <div id="song-info">
            <div id="song-title">{songTitle}</div>
            <div id="song-artist">{songArtist}</div>
          </div>
        </div>
        <div id="audio-player">
          {songsData && songsData.length > 0 && currentSong && (
            <MyAudioPlayer 
              src={currentSong}
              ref={audioElem}
              customIcons={customIcons}
              showSkipControls={true} 
              showJumpControls={false}
              showDownloadProgress={false}
              style={playerStyles}
            />
          )}
        </div>
      </div>  
    </> 
  );
};

export default AudioPlayer;
