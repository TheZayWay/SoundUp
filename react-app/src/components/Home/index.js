import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from "../Navigation";
import AllSongs from "../Songs";
import './Home.css'

export default function HomePage () {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogOut = async (e) => {
        dispatch(logout())
    }
    
    return (
    <>
      <Navigation />
      <h1>Homepage</h1>
      <button onClick={() => {history.push('/login')}}>Login</button>
      <button onClick={handleLogOut}>Log Out</button>
      <AllSongs />
    </>    
    )
}