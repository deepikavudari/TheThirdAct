import { useState,useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import fetch_movie_info from "../utils/fetch_movie_info";
import { AuthContext } from "../components/AuthContext";
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
            try{
                setLoading(true);
            const res = await fetch(`http://127.0.0.1:8000/profile/${id}`,{
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            });
            const result = await res.json();
            if(!res.ok){
                throw new Error(result.detail);
            }
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
    },[]);

    const [movieInfo, setMovieInfo] = useState([]);

    useEffect(()=>{

    async function getMovies(){

        const data = await Promise.all(
            movies.map((movie)=>(
                fetch_movie_info(movie.movie_id)
            ))
        );

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
            <h2>
                No movies added to this list yet!
            </h2>
        )
    }

    

    return(
        <>
        <h1>{listName}</h1>
            <div className="list-movies-grid">
            {
                movieInfo.map((movie)=>(
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

            </div>
            ))
        }
            </div>
        </>
    )
}