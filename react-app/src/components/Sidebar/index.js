import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineMusicNote } from "react-icons/hi";
import "./Sidebar.css"

function Sidebar () {
  const user = useSelector((state) => state?.session?.user?.id);

  const handleComingSoon = () => {
    alert("Currently building...")
  };

  return (
    <>
      {user ? (
        <div id="sidebar-cont">
          <div id="gohome-cont">
            <Link id="gohome-btn" to="/"><MdHomeFilled /></Link>
            <span id="gohome-text">Home</span>
          </div>
          <div id="library-cont">
            <Link id="library-btn" to="/library"><MdLibraryMusic /></Link>
            <span id="library-text">Library</span>
          </div>
          <div id="favorite-cont">
            <Link id="favorite-btn" to="/" onClick={handleComingSoon}><MdFavoriteBorder /></Link>
            <span id="favorite-text">Favorites</span>
          </div>
          <div id="playlist-cont">
            <Link id="playlist-btn" to="/" onClick={handleComingSoon}><HiOutlineMusicNote /></Link>
            <span id="playlist-text">Playlist</span>
          </div>
        </div>
        ) : (
        <div id="sidebar-cont">
          <div id="gohome-cont">
            <Link id="gohome-btn" to="/"><MdHomeFilled /></Link>
            <span id="gohome-text">Home</span>
          </div>
          <div id="library-cont">
            <Link id="library-btn" to="/login"><MdLibraryMusic /></Link>
            <span id="library-text">Library</span>
          </div>
          <div id="favorite-cont">
            <Link id="favorite-btn" to="/" onClick={handleComingSoon}><MdFavoriteBorder /></Link>
            <span id="favorite-text">Favorites</span>
          </div>
          <div id="playlist-cont">
            <Link id="playlist-btn" to="/" onClick={handleComingSoon}><HiOutlineMusicNote /></Link>
            <span id="playlist-text">Playlist</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;