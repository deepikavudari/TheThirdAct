import { useState, useEffect } from "react";
import "../styles/Profile.css";


export default function Profile(){
    const [userData, setUserData] = useState({});
    useEffect(()=>{
        async function getUserData(){
            try{
                const token = localStorage.getItem("token");
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
    },[])

    return(
        <>
        <div className="profile-page">

    <div className="profile-header">
        <h1>{userData.message}</h1>
    </div>


    <div className="lists-section">

        <div className="section-title">
            <h2>Your Lists</h2>

            <button className="add-list-btn">
                + Create List
            </button>
        </div>


        <div className="lists-grid">

            {
                userData.lists?.length > 0 ? (

                    userData.lists.map((list)=>(
                        <div className="list-card" key={list}>
                            <h3>{list}</h3>
                            <p>0 movies</p>
                        </div>
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