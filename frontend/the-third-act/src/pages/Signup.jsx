import { useState } from "react";
import "../styles/signup.css";
import { Link } from "react-router-dom";

export default function RenderSignup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    async function sendInfo(){
        const userInfo = {
            username : username,
            email : email,
            password : password
        };
        try{
            const res = await fetch("http://127.0.0.1:8000/signup",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(userInfo)
            });
            if(!res.ok){
                throw new Error(`Server error : ${res.status}`);
            }

            const result = await res.json();
            console.log(result);

        }
        catch(error){
            const signupPage = document.getElementsByClassName("signup-page")[0];
            signupPage.innerHTML = `Failed to create account : ${error}`
            return;
        }
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


                <button onClick={sendInfo}>
                    Sign Up
                </button>
                <p className="page-link">Already have an account? <Link to = "/login">Login</Link></p>
            </div>

        </div>
    )
}