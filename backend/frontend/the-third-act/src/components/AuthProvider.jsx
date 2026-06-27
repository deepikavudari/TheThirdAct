import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({children}){
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [lists,setLists] = useState([]);
    
    const navigate = useNavigate();

    useEffect(()=>{
        async function getLists(){
            if(!token){
                setLists([]);
                return;
            }
            try{
                const res = await fetch("http://127.0.0.1:8000/profile",{
                    headers : {
                        "Authorization" : `Bearer ${token}`
                    }
                });

                if(!res.ok){
                    throw new Error("Error fetching user profile, try again!");
                }

                const result = await res.json();
                setLists(result.lists);
            } catch(error){
                console.log(error);
            }
        }
        getLists();
        }
    ,[token]);

    function login(token){
        localStorage.setItem("token",token);
        setToken(token);
    }

    function logout(){
        localStorage.removeItem("token");
        setToken(null);
        setLists([]);
        navigate("/");
    }

    return(
        <AuthContext.Provider value={{token,lists,setLists,login,logout}}>
        <>
            {children}
        </>
        </AuthContext.Provider>
    )


}