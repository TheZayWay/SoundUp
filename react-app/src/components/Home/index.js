import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner"
import { getAllSongsThunk } from "../../store/song";
import Navigation from "../Navigation";
import CoverArt from "../CoverArt";
import Sidebar from "../Sidebar";
import AudioPlayer from "../Audioplayer";
import './Home.css'

export default function HomePage () { 
  const songsArr = useSelector((state) => state?.song?.allSongs);
  const songsData = [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch])
  
  return (
    <div id="homepage-cont">
      {songsArr ? (
        <>
          <Navigation />
          <hr id="home-hr-top"></hr>
          <div id="home-divider">
            <Sidebar />
            <CoverArt />
          </div>
          {songsArr ? songsArr.map((song,idx) => songsData.push(song.filepath)) : ""}
          <AudioPlayer 
            songsData={songsData}
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