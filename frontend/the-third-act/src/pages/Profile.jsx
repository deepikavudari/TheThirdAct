import { useState, useEffect, useContext} from "react";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";



export default function Profile(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [userLists, setUserLists] = useState([]);


    const {token,setLists} = useContext(AuthContext);
    
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
                setUsername(result.username);
                setUserLists(result.lists);
                setLists(result.lists);
            } catch(error){
                console.log(error);
            }
        }
        getUserData();
    },[setLists,token])

    function createList(){
        navigate(`/createList`);
    }

    async function del_list(list_id){
        try {
        const res = await fetch(`http://127.0.0.1:8000/list/${list_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        let data = null;
        try {
            data = await res.json();
        } catch {}

        if (!res.ok) {
            throw new Error(data?.detail || "Delete failed");
        }

        setLists(prev => prev.filter(list => list.id !== list_id));
        setUserLists(prev => prev.filter(list => list.id !== list_id));
        return;

    } catch (error) {
        console.log(error);
    }
    }


    if(token===null){
        return(
            <h1>
                Login to your account to see profile page!
            </h1>
        )
    }

    if(!username){
    return <p>Loading...</p>
    }

    return(
        <>
        <div className="profile-page">

    <div className="profile-header">
        <h1>Hello {username}</h1>
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
                userLists?.length > 0 ? (

                    userLists.map((list)=>(
                        <Link to={`/profile/${list.id}`}>
                        <div className="list-card" key={list.id}>
                            
                            <h3>{list.list_name}</h3>
                            <button
                            className="delete-button"
                            onClick={(e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                                del_list(list.id)}
                                }>Delete</button>
                            
                            
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