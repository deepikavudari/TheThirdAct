import { useState,useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import fetch_movie_info from "../utils/fetch_movie_info";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";
import "../styles/ListInfo.css";



export default function ListInfo(){
    const [movies,setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const {listId} = useParams();
    const [listName,setListName] = useState("");
    const {token} = useContext(AuthContext);
    const id = Number(listId);
    useEffect(()=>{
        async function getListMovies(id){
            const API_URL = import.meta.env.VITE_API_URL;
            try{
                setLoading(true);
            const res = await fetch(`${API_URL}/profile/${id}`,{
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            });
            const result = await res.json();
            if(!res.ok){
                throw new Error(result.detail);
            }
            console.log(result.movies);
            setMovies(result.movies);
            setListName(result.list_name);
            
            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false);
            }
            
        }
        getListMovies(id);
    },[id,token]);

    async function del_movie(movie_id){
        try {
            const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/list/${listId}/${movie_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        let data = null;
        try {
            data = await res.json();
        } catch {console.log("error");}

        if (!res.ok) {
            throw new Error(data?.detail || "Delete failed");
        }
        setMovies(prev => prev.filter(m => m.movie_id !== movie_id));
        setMovieInfo(prev => prev.filter(m => m[0].id !== movie_id));

    } catch (error) {
        console.log(error);
    }
    }


    const [movieInfo, setMovieInfo] = useState([]);

    useEffect(()=>{

    async function getMovies(){

        const data = await Promise.all(
            movies.map((movie)=>(
                fetch_movie_info(movie.movie_id)
            ))
        );

        console.log(data);

        setMovieInfo(data);

    }

    if(movies.length > 0){
        getMovies();
    }

    },[movies]);

    if(loading){
        return(
            <h2>
                Loading movies...
            </h2>
        )
    }

    if(movies.length===0){
        return(
            <>
                <h1>{listName}</h1>
                <h2>
                    No movies added to this list yet!
                </h2>
            </>
        )
    }

    console.log(listName);
    

    return(
        <>
        <h1>{listName}</h1>
            <div className="list-movies-grid">
            {
                movieInfo.map((movie)=>(
                <Link to={`/movies/${movie[0].id}`}>
                    <div className="list-movie-card" key={movie[0].id}>

                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie[0].posterUrl}`}
                            alt={movie[0].title}
                        />

                        <div className="list-movie-info">
                            <h3>{movie[0].title}</h3>

                            <p>
                                ⭐ {movie[0].rating.toFixed(2)}
                            </p>
                        </div>

                        <button 
                        className="delete-btn"
                        onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            del_movie(movie[0].id)}
                        }
                        >
                            Delete
                        </button>

                    </div>
                </Link>
                
            ))
        }
            </div>
        </>
    )
}