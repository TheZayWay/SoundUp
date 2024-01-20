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

function AudioPlayer ({songsData, allSongs, currentSrc, isPlaying, onPlayPause, onIsClicked, audioElem, onSrcChange }) {  
  let idx; 

  idx = allSongs.findIndex((song, index) => {
    return currentSrc === song.filepath;
  });

  let songTitle = "";
  let songArtist = "";
  let imageSrc = "";
  
  if (idx !== -1) {
    songTitle = allSongs[idx].title;
    songArtist = allSongs[idx].artist;
    imageSrc = allSongs[idx].imagepath;
  } else {
    console.log("Song not found");
  }
  
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
      let nextIndex = (idx + 1) % allSongs.length;
      currentSrc = allSongs[nextIndex].filepath;
      onSrcChange(currentSrc);
      audioElem.current.audio.current.play(); 
    }
  };

  const playPrevSong = () => {
    if (currentSrc) {
      let prevIndex = (idx - 1 + allSongs.length) % allSongs.length;
      currentSrc = allSongs[prevIndex].filepath;
      onSrcChange(currentSrc);
      audioElem.current.audio.current.play(); 
    }
  };

  const handleSkip = () => {
    playNextSong()
  };

  const handleBack = () => {
    playPrevSong()
  };
  
    
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
          {songsData && songsData.length > 0 && songsData[idx] && (
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
