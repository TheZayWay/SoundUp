import Navigation from "../Navigation";
import AllSongs from "../Songs";
import './Home.css'

export default function HomePage () {   
  return (
    <>
      <Navigation />
      <hr id="home-hr-top"></hr>
      <div id="home-content">
        <div id="vertical-line-cont">
          <hr id="home-hr-side"></hr>
        </div>
        <AllSongs />
      </div>
    </>    
    )
};