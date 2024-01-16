import { useState, useRef, useEffect } from "react";
import { IoMdPlay } from "react-icons/io";
import { IoPlaySkipBackSharp } from "react-icons/io5";
import { IoPlaySkipForwardSharp } from "react-icons/io5";
import { IoPauseSharp } from "react-icons/io5";
import { ImLoop } from "react-icons/im";
import { IoVolumeMediumSharp } from "react-icons/io5";
import { IoVolumeMuteSharp } from "react-icons/io5";
import MyAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./AudioPlayer.css";

function AudioPlayer ({songsData, allSongs, currentSrc, isPlaying, onPlayPause, onIsClicked, audioElem }) {  
  
  const [currentSongIdx, setCurrentSongIdx] = useState(0);
  const currentSongIndex = allSongs.findIndex(song => song.filepath === currentSrc);
  const nextIndex = (currentSongIndex + 1) % allSongs.length;
  const prevIndex = (currentSongIndex - 1 + allSongs.length) % allSongs.length;
  const nextSrc = allSongs[nextIndex].filepath;
  const prevSrc = allSongs[prevIndex].filepath;
  let songTitle;
  let songArtist;
  let imageSrc;

  const handleOnPlay = () => {
    if (!isPlaying && currentSrc) {
      onPlayPause();
      onIsClicked();
      audioElem.current.audio.current.play();
    };
  };
  
  const handleOnPause = () => {
    if (isPlaying && currentSrc) {
      onPlayPause();
      onIsClicked();
      audioElem.current.audio.current.pause();
    };
  };

  const playNextSong = () => {
    if (currentSrc) {
      const newCurrentSrc = nextSrc;
      setCurrentSongIdx(nextIndex);
      audioElem.current.audio.current.src = newCurrentSrc;
    }
  };

  const playPrevSong = () => {
    if (currentSrc) {
      const newCurrentSrc = prevSrc;
      setCurrentSongIdx(newCurrentSrc);
      audioElem.current.audio.current.src = newCurrentSrc;
    }
  };

  allSongs.forEach((song) => {
    if (currentSrc === song.filepath) {
      songTitle = song.title;
      songArtist = song.artist;
      imageSrc = song.imagepath;
    }
  });

  const customIcons = {
    play: <IoMdPlay size={32} color="rgb(255,255,255)" />,
    pause: <IoPauseSharp size={32} color="rgb(255,255,255" />,
    previous: <IoPlaySkipBackSharp size={22} color="rgb(255,255,255" className="prev-btn" />, 
    next: <IoPlaySkipForwardSharp size={22} color="rgb(255,255,255" className="next-btn" />, 
    loop: <ImLoop size={20} color="rgb(255,255,255)"/>,
    loopOff: <ImLoop size={20} color="#aaaaaa6d"/>,
    volume: <IoVolumeMediumSharp size={25}/>,
    volumeMute: <IoVolumeMuteSharp size={25}/>
  };

  const playerStyles = {
    backgroundColor: 'transparent',
    width: '500px', 
  };

  return ( 
    <>
      <div id="audioplayer-cont">
        <div id="audio-content">
          <img id="song-image" src={imageSrc} alt=""></img>
          <div id="song-info">
            <div id="song-title">{songTitle}</div>
            <div id="song-artist">{songArtist}</div>
          </div>
        </div>
        <div id="audio-player">
          {songsData && songsData.length > 0 && songsData[currentSongIdx] && (
            <MyAudioPlayer 
              src={currentSrc}
              ref={audioElem}
              // onEnded={playNextSong}
              customIcons={customIcons}
              showSkipControls={true} 
              showJumpControls={false}
              showDownloadProgress={false}
              layout="stacked-reverse" 
              style={playerStyles}
              autoPlay={currentSrc} 
              onPlay={handleOnPlay}
              onPause={handleOnPause}
              // onClickPrevious={playPrevSong}
              // onClickNext={playNextSong}
            />
          )}
        </div>
      </div>  
    </> 
  );
};

export default AudioPlayer;


