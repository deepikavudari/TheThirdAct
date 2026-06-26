import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import "../styles/NavBar.css";



export default function NavBar(){
    const {token, logout} = useContext(AuthContext);

    return(
        <nav className="navbar">
            <Link to="/" className="logo">
                The Third Act
            </Link>

            <div className="nav-links">

            <Link to="/search">
                Search
            </Link>

            {
                token ? (
                    <>
                    <Link to="/profile">
                        Profile
                    </Link>
                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>
                    </>
                    
                )
                :
                (
                    <>
                    <Link to="/login">
                        Login
                    </Link>
                    
                    <Link to="/signup"
                        className="signup-btn"
                    >
                        Signup
                    </Link>
                    </>
                )
            }
            </div>
        </nav>
    )
}