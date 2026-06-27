import { useState, useEffect, useContext

 } from "react";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";


export default function Profile(){
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const {token} = useContext(AuthContext);
    
    useEffect(()=>{
        async function getUserData(){
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
                setUserData(result);
            } catch(error){
                console.log(error);
            }
        }
        getUserData();
    },[token])

    function createList(){
        navigate(`/createList`);
    }

    if(token===null){
        return(
            <h1>
                Login to your account to see profile page!
            </h1>
        )
    }

    if(!userData.username){
    return <p>Loading...</p>
    }

    return(
        <>
        <div className="profile-page">

    <div className="profile-header">
        <h1>Hello {userData.username}</h1>
    </div>


    <div className="lists-section">

        <div className="section-title">
            <h2>Your Lists</h2>

            <button 
            className="add-list-btn"
            onClick={createList}
            >
                + Create List
            </button>
        </div>


        <div className="lists-grid">

            {
                userData.lists?.length > 0 ? (

                    userData.lists.map((list)=>(
                        <Link to={`/profile/${list.id}`}>
                        <div className="list-card" key={list.id}>
                            <h3>{list.list_name}</h3>
                        </div>
                        </Link>
                    ))

                ) : (

                    <p className="empty">
                        No lists created yet
                    </p>

                )
            }


        </div>

        </div>

    </div>
        </>
    )

}