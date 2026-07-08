import {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import Error from "../components/Error";

export default function Login(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    async function validate_user(){
        const formData = new URLSearchParams();

        formData.append("username",username);
        formData.append("password",password);
        const API_URL = import.meta.env.VITE_API_URL;
        try{
            const res = await fetch(`${API_URL}/login`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                body : formData
            });

            const result = await res.json();
            // token is present in this result

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
                return
            }

            login(result.access_token);


        } catch(error){
            console.log(`Failed to log in user : ${error}`);
            return;
        }
        navigate("/profile");
    }

    return(
        <div className="signup-page">

            <div className="signup-card">

                <h1 className="signup-title">
                    Login
                </h1>

                <p className="signup-subtitle">
                    Explore the world of cinema
                </p>


                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <Error msg={error}/>
                <button onClick={validate_user}>
                    Login
                </button>
                <p className="page-link">Don't have an account? <Link to = "/signup">Signup</Link></p>
            </div>

        </div>
    )

}