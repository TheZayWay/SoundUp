import { useState, useRef } from "react";
import { IoMdPlay } from "react-icons/io";
import { IoPlaySkipBackSharp } from "react-icons/io5";
import { IoPlaySkipForwardSharp } from "react-icons/io5";
import { IoPauseSharp } from "react-icons/io5";
import { ImLoop } from "react-icons/im";
import { BiSolidVolumeFull } from "react-icons/bi";
import { ImVolumeMute2 } from "react-icons/im";
import MyAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "./AudioPlayer.css";

function AudioPlayer ({songsData, allSongs}) {  
  let audioElem = useRef(null);
  const [currentSongIdx, setCurrentSongIdx] = useState(2);
  const [songTitle, setSongTitle] = useState(allSongs[currentSongIdx].title);
  const [songArtist, setSongArtist] = useState(allSongs[currentSongIdx].artist);

  const playNextSong = () => {
    const nextIdx = (currentSongIdx + 1) % songsData.length;
    setCurrentSongIdx(nextIdx);
    setSongTitle(allSongs[nextIdx].title);
    setSongArtist(allSongs[nextIdx].artist);
  };

  const playPrevSong = () => {
    const prevIdx = (currentSongIdx - 1 + songsData.length) % songsData.length;
    setCurrentSongIdx(prevIdx);
    setSongTitle(allSongs[prevIdx].title);
    setSongArtist(allSongs[prevIdx].artist);
  };
 
  const customIcons = {
    play: <IoMdPlay size={32} color="rgb(255,255,255)" />,
    pause: <IoPauseSharp size={32} color="rgb(255,255,255" />,
    previous: <IoPlaySkipBackSharp size={22} color="rgb(255,255,255" className="prev-btn" onClick={playPrevSong}/>,
    next: <IoPlaySkipForwardSharp size={22} color="rgb(255,255,255" className="next-btn" onClick={playNextSong}/>,
    loop: <ImLoop size={22} color="rgb(255,255,255)"/>,
    loopOff: <ImLoop size={22} color="#aaa"/>,
    volume: <BiSolidVolumeFull />,
    volumeMute: <ImVolumeMute2 />
  };

  const playerStyles = {
    backgroundColor: 'transparent',
    width: '500px', 
  };

  return ( 
    <>
      <div id="audioplayer-cont">
        <div id="audio-content">
          <img id="song-image" src={allSongs[currentSongIdx].imagepath} alt=""></img>
          <div id="song-info">
            <div id="song-title">{songTitle}</div>
            <div id="song-artist">{songArtist}</div>
          </div>
        </div>
        <div id="audio-player">
          {songsData && songsData.length > 0 && songsData[currentSongIdx] && (
            <MyAudioPlayer 
              src={songsData[currentSongIdx]}
              ref={audioElem}
              onEnded={playNextSong}
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
