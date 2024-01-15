import { Link } from "react-router-dom";
import "./Sidebar.css"

function Sidebar () {
  return (
    <div id="sidebar-cont">
      <p><Link to="/">Home</Link></p>
      <p><Link to="/library">Library</Link></p>
      <p>Albums</p>
      <p>Playlists?</p>
      <p>Likes?</p>
      <p>Queue?</p>
    </div>
  );
};

export default Sidebar;