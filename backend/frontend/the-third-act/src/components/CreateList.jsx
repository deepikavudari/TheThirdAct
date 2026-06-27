// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Search.css"


export default function CreateList(){
    const [listName, setListName] = useState("");
    const navigate = useNavigate();

    async function sendInfo(){
        const token = localStorage.getItem("token");
        const listInfo = {
            list_name : listName,
        }
        try{
            const res = await fetch("http://127.0.0.1:8000/lists",{
                "method" : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body : JSON.stringify(listInfo)
            });
            const result = await res.json();
            if(!res.ok){
                throw new Error(result.detail);
            }
            navigate("/profile")
        } catch(error){
            console.log(error);
        }

        

    }

    return(<div className="search-page">

            <div className="search-box">

                <h1>
                    Create List
                </h1>

                <div className="search-input-container">

                    <input
                        type="text"
                        placeholder="List name.."
                        value={listName}
                        onChange={(e)=>{setListName(e.target.value)}}
                    />
                    
                    <button onClick={sendInfo}>
                    Create
                    </button>
                    

                </div>

            </div>

        </div>
    )
}