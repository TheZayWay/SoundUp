import { useDispatch } from "react-redux"
import { logout } from "../../store/session"

export default function HomePage () {
    const dispatch = useDispatch()

    const handleLogOut = async (e) => {
        dispatch(logout())
    }
    
    return (
    <>
        <h1>
            Homepage
        </h1>
        <button onClick={handleLogOut}>Log Out</button>
    </>
    
    )
}