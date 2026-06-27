import { useEffect } from "react";

export default function ErrorMsg({msg,closeModal}){

        useEffect(()=>{
            setTimeout(()=>{
                closeModal();
            },2000);
            // return ()=>clearTimeout(timeoutId);
        },[closeModal]);

        return(
            <div className="modal-overlay">
                <div className="list-modal">
                    <h2>
                        {msg}
                    </h2>
                </div>
            </div>
        )        
    }