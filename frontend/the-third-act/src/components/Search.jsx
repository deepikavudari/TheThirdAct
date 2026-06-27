// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Search.css"

export default function Search(){
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    function handleSearch(){
        navigate(`/search/${query}`)
    }


    return(<div className="search-page">

            <div className="search-box">

                <h1>
                    Find a movie
                </h1>

                <div className="search-input-container">

                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={query}
                        onChange={(e)=>{setQuery(e.target.value)}}
                    />
                    
                    <button onClick={handleSearch}>
                    Search
                    </button>
                    

                </div>

            </div>

        </div>
    )
}