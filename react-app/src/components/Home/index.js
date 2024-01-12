import Navigation from "../Navigation";
import AllSongs from "../Songs";
import Sidebar from "../Sidebar";
import './Home.css'

export default function HomePage () {   
  return (
    <>
      <Navigation />
      <hr id="home-hr-top"></hr>
      <div id="home-divider">
        <Sidebar />
        {/* <hr id="vertical-line"></hr>
        <AllSongs /> */}
      </div>
      
      
    </>    
    )
};