import ErrorMsg from "./ErrorMsg";
import "../styles/AddToListModal.css"
import { useState } from "react";


export default function AddToListModal({lists, closeModal, token, movie_id}){

    const [checkedLists, setCheckedLists] = useState([]);

    async function addMovie(movie_id,listId){
            try{
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/list/${listId}/${movie_id}`,{
                    method : "POST",
                    headers : {
                        "Authorization" : `Bearer ${token}`,
                        "Content-Type" : "application/json"
                    }          
                });
                const result = await res.json();
                if(!res.ok){
                    throw new Error(result.detail);
                }
                console.log(result.message);
            } catch(error){
                console.log(error);
            }
        }

    function sendInfo(){
        
        checkedLists.map((listId)=>{
            console.log(listId);
            addMovie(movie_id,listId);
        })
        closeModal();
    }
    
    
    
        

    if(token==null){
        return (
        <ErrorMsg
        msg = "Log in to access lists"
        closeModal={closeModal}
        />);
    }
    if(lists.length==0){
        return (<ErrorMsg
        msg = "No lists created!"
        closeModal={closeModal}
        />);
    }

    return(
        <div className="modal-overlay">

            <div className="list-modal">

                <h2>
                    Add to list
                </h2>


                <div className="list-options">

                    {
                        lists.map((list)=>(
                            <label 
                                className="list-option"
                                key={list.id}
                            >

                                <input 
                                    type="checkbox"
                                    checked = {checkedLists.includes(list.id)}
                                    onChange={(e)=>{
                                        if(e.target.checked){
                                            setCheckedLists([...checkedLists,list.id])
                                        }
                                        else{
                                            setCheckedLists(checkedLists.filter((id)=>id !== list.id));
                                        }
                                    }}
                                    value={list.id}
                                />

                                <span>
                                    {list.list_name}
                                </span>

                            </label>
                        ))
                    }

                </div>


                <div className="modal-buttons">

                    <button 
                        className="cancel-btn"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>


                    <button 
                        className="add-btn"
                        onClick={sendInfo}
                    >
                        Add
                    </button>

                </div>


            </div>

        </div>
    )
}
