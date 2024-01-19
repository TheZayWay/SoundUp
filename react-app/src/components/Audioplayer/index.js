import { useState } from "react";
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
  const [nextSongIdx, setNextSongIdx] = useState();
  const [prevSongIdx, setPrevSongIdx] = useState();
  let songTitle;
  let songArtist;
  let imageSrc;
  let handleSkipCalled = false;

  

  const playNextSong = () => {
    if (currentSrc) {
      let nextIndex = (currentSongIdx + 1) % allSongs.length;
      setCurrentSongIdx(nextIndex);
      
      let nextSrc = allSongs[nextIndex].filepath;
      let nextIdx = (nextIndex + 1) % allSongs.length;

      setNextSongIdx(nextIdx);
      audioElem.current.audio.current.src = nextSrc;
      audioElem.current.audio.current.play(); 
    }
  };

  const playPrevSong = () => {
    if (currentSrc) {
      let prevIndex = (currentSongIdx - 1 + allSongs.length) % allSongs.length;
      setCurrentSongIdx(prevIndex);
      
      let prevSrc = allSongs[prevIndex].filepath;
      let prevIdx = (prevIndex - 1 + allSongs.length) % allSongs.length;

      setPrevSongIdx(prevIdx);
      songTitle = allSongs[prevIdx].title
      audioElem.current.audio.current.src = prevSrc;
      audioElem.current.audio.current.play(); 
      
    }
  };

  
  
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

  const handleSkip = () => {
    playNextSong();
    handleSkipCalled = true;
  };

  const handleBack = () => {
    playPrevSong()
  };

  allSongs.forEach((song, idx) => {
    if (currentSrc === song.filepath) {
      songTitle = song.title;
      songArtist = song.artist;
      imageSrc = song.imagepath;
      console.log(currentSrc)
    }
    if (handleSkipCalled) {
      songTitle = allSongs[idx + 1].title
    }
  });
  
  const customIcons = {
    play: <IoMdPlay size={32} color="rgb(255,255,255)" id="audioplay-btn"/>,
    pause: <IoPauseSharp size={32} color="rgb(255,255,255" id="audiopause-btn"/>,
    previous: <IoPlaySkipBackSharp size={22} id="prev-btn" onClick={handleBack} />,
    next: <IoPlaySkipForwardSharp size={22} id="next-btn" onClick={handleSkip} />,   
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
              customIcons={customIcons}
              showSkipControls={true} 
              showJumpControls={false}
              showDownloadProgress={false}
              layout="stacked-reverse" 
              style={playerStyles}
              autoPlay={currentSrc} 
              onPlay={handleOnPlay}
              onPause={handleOnPause}
              onEnded={handleSkip}
            />
          )}
        </div>
      </div>  
    </> 
  );
};

export default AudioPlayer;
