import { useState } from "react";
import "../styles/signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";

export default function RenderSignup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");

    const navigate = useNavigate();

    async function sendInfo(){
        const userInfo = {
            username : username,
            email : email,
            password : password
        };
        try{
            const API_URL = import.meta.env.VITE_API_URL;
            const res = await fetch(`${API_URL},signup`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(userInfo)
            });
            const result = await res.json();
            if(!res.ok){
                if(Array.isArray(result.detail)){
                    // Pydantic validation errors
                    setError(result.detail[0].message);
                }
                else{
                    // Your HTTPException errors
                    setError(result.detail);
                    console.log(error);
                    
                }
                return;
            }

            
            console.log(result);

        }
        catch(error){
            setError("Unable to connect to server. Please try again.");
            console.log(error);
        }
        navigate("/login")
    }

    return(
        <div className="signup-page">

            <div className="signup-card">

                <h1 className="signup-title">
                    Create Account
                </h1>

                <p className="signup-subtitle">
                    Join the world of cinema
                </p>


                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <Error msg={error}/>
                <button onClick={sendInfo}>
                    Sign Up
                </button>
                <p className="page-link">Already have an account? <Link to = "/login">Login</Link></p>
            </div>

        </div>
    )
}