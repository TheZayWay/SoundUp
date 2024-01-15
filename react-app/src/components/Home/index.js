import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner"
import { getAllSongsThunk } from "../../store/song";
import Navigation from "../Navigation";
import CoverArt from "../CoverArt";
import Sidebar from "../Sidebar";
import AudioPlayer from "../Audioplayer";
import './Home.css'

function HomePage () {
  const dispatch = useDispatch();
  const [currentSrc, setCurrentSrc] = useState(null);
  const songsArr = useSelector((state) => state?.song?.allSongs);
  const songsData = [];
  const allSongs = [];
  
  const handleSrcChange = (src) => {
    setCurrentSrc(src);
  }; 

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch]);
  
  return (
    <div id="homepage-cont">
      {songsArr ? (
        <>
          <Navigation />
          <hr id="home-hr-top"></hr>
          <div id="home-divider">
            <Sidebar />
            <CoverArt 
              songsData={songsData}
              allSongs={allSongs}
              onSrcChange={handleSrcChange}
            />
          </div>
          {songsArr ? songsArr.map((song,idx) => {songsData.push(song.filepath); allSongs.push(song); return null}) : ""}
          <AudioPlayer 
            songsData={songsData}
            allSongs={allSongs}
            currentSrc={currentSrc}
          />
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
  )
};

export default HomePage;