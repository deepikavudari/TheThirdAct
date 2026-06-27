import "../styles/Error.css"

export default function Error({msg}){
    if(msg==""){
        return null;
    }
    return(
        <>
        <div className="error-message">
            {msg}
        </div>
        </>
    )
}