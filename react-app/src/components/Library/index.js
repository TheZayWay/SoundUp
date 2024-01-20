import { useState, useRef } from "react";
import { useSelector} from "react-redux";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import LibraryCoverArt from "../LibraryCoverArt";
import AudioPlayer from "../Audioplayer";
import { RotatingLines } from "react-loader-spinner";


function Library () {
  const audioElem = useRef(null);
  const [currentSrc, setCurrentSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const songsArr = useSelector((state) => state?.song?.allSongs);
  const userId = useSelector((state) => state?.session.user.id);
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

  return (
    <div id="homepage-cont">
      {songsArr && userId ? (
        <>
        {songsArr ? songsArr.filter((song) => {if (song.user_id === userId) {songsData.push(song.filepath); allSongs.push(song);} return null;}) : ""}
          <Navigation />
          <div id="home-divider">
            <Sidebar />
            <div id="song-cont">
              <LibraryCoverArt 
                songsData={songsData}
                allSongs={allSongs}
                onSrcChange={handleSrcChange}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onIsClicked={handleClicked}
                audioElem={audioElem}
                isClicked={isClicked}
              />
            </div>
          </div>
          <div id="audioplayer-cont">
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