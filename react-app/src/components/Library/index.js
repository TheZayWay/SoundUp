import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSongsThunk } from "../../store/song";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import AudioPlayer from "../Audioplayer";
import { RotatingLines } from "react-loader-spinner";

function Library () {
  const songsArr = useSelector((state) => state?.song?.allSongs);
  const songsData = [];
  const allSongs = [];
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllSongsThunk())
  }, [dispatch]);

  return (
    <div>
      { songsArr ? (
        <>
          <Navigation />
          <hr id="home-hr-top"></hr>
          <Sidebar />
          {songsArr ? songsArr.map((song,idx) => {songsData.push(song.filepath); allSongs.push(song); return null}) : ""}
          <AudioPlayer 
            songsData={songsData}
            allSongs={allSongs}
          />
        </>) : 
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

export default Library;