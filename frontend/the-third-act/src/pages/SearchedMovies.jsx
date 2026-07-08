import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx"
import "../styles/SearchedMovies.css"

export default function SearchedMovies(){
    const {query} = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        async function getMovies(){
            let allMovies = [];
            setLoading(true);
            try{
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/movies/search/${query}`);

                if(res.ok){
                    const data = await res.json();
                    allMovies = [...allMovies,...data]
                }

            } catch(error){
                console.log("Search API failed ,", error);
            }
            try{
                const API_URL = import.meta.env.VITE_API_URL;
                const res = await fetch(`${API_URL}/search/${query}`);
                if(res.ok){
                    const data = await res.json();
                    allMovies = [...allMovies,...data]
                }
            } catch(error){
                console.log("Genre API failed, ", error);
            }
            
            setMovies(allMovies);
            setLoading(false);

        }
        getMovies();

    },[query])

    if(loading){
        return(
            <h1>
                Loading
            </h1>
        )
    }

    if(movies.length==0){
        return(
            <h1>
                No movies found! Check spelling and try again.
            </h1>
        )
    }

    return(
        <>
        <h1>Showing search results for "{query}"</h1>
        <div className="movie-container">
            {
                movies.map((movie)=>{
                    return(
                        <MovieCard
                        key={movie.id}
                        id = {movie.id}
                        title = {movie.title}
                        poster = {movie.poster}
                        rating = {movie.rating}
                    />
                    )
                    
                })
            }

        </div>
            
        </>
    )

}