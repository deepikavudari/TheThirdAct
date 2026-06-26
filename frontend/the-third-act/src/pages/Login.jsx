import {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    async function validate_user(){
        const formData = new URLSearchParams();

        formData.append("username",username);
        formData.append("password",password);

        try{
            const res = await fetch("http://127.0.0.1:8000/login",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded"
                },
                body : formData
            });
            if(!res.ok){
                throw new Error(`Server error : ${res.status}`);
            }

            const result = await res.json();
            // token is present in this result
            login(result.access_token);
            // console.log(result);
        } catch(error){
            console.log(`Failed to log in user : ${error}`);
        }
        navigate("/");
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


                <button onClick={validate_user}>
                    Login
                </button>
                <p className="page-link">Don't have an account? <Link to = "/signup">Signup</Link></p>
            </div>

        </div>
    )

}