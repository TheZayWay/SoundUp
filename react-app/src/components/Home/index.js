import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner"
import { getAllSongsThunk } from "../../store/song";
import Navigation from "../Navigation";
import CoverArt from "../CoverArt";
import Sidebar from "../Sidebar";
import AudioPlayer from "../Audioplayer";
import './Home.css'

function HomePage () {
  const audioElem = useRef(null);
  const dispatch = useDispatch();
  const [currentSrc, setCurrentSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const songsArr = useSelector((state) => state?.song?.allSongs);
  const songsData = [];
  const allSongs = [];
  
  const handleSrcChange = (src) => {
    if (src) {
      setCurrentSrc(src)
    }
  }; 

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  };

  const handleClicked = () => {
    setIsClicked(true)
  };

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch]);
  
  return (
    <div id="homepage-cont">
      {songsArr ? (
        <>
          <Navigation />
          <div id="home-divider">
            <Sidebar />
            <div id="song-cont">
              <CoverArt 
                songsData={songsData}
                allSongs={allSongs}
                onSrcChange={handleSrcChange}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onIsClicked={handleClicked}
                audioElem={audioElem}
              />
            </div>
          </div> 
          <div id="audioplayer-cont">
            {songsArr ? songsArr.map((song) => {songsData.push(song.filepath); allSongs.push(song); return null}) : ""}
            <AudioPlayer 
              songsData={songsData}
              allSongs={allSongs}
              currentSrc={currentSrc}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onIsClicked={handleClicked}
              audioElem={audioElem}
            />
          </div>
        </> ) : 
        <RotatingLines
          visible={true}
          height="100"
          width="100"
          color="gray"
          strokeWidth="5"
          animationDuration="1"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      }
    </div>    
  );
};

export default HomePage;