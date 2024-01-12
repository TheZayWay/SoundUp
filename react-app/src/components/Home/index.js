import Navigation from "../Navigation";
import AllSongs from "../Songs";
import Sidebar from "../Sidebar";
import AudioPlayer from "../Audioplayer";
import './Home.css'

export default function HomePage () {   
  return (
    <div id="homepage-cont">
      <Navigation />
      <hr id="home-hr-top"></hr>
      <div id="home-divider">
        <Sidebar />
        <AllSongs /> 
      </div>
      <AudioPlayer />
    </div>    
    )
};