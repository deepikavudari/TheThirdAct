import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx"
import "../styles/SearchedMovies.css"

export default function SearchedMovies(){
    const {query} = useParams();
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
        async function getMovie(){
            try{
                const res = await fetch(`http://127.0.0.1:8000/movies/search/${query}`);
                if(!res.ok){
                    throw new Error("Failed to fetch searched movie");
                }
                const data = await res.json();
                setMovies(data);
            } catch(error){
                console.log(error);
            }
        }
        getMovie();
    },[query])

    useEffect(()=>{
        async function getMovieGenre(){
            try{
                const res = await fetch(`http://127.0.0.1:8000/search/${query}`);
                if(!res.ok){
                    throw new Error("Failed to fetch searched movie");
                }
                const data = await res.json();
                setMovies([...movies,...data]);
            } catch(error){
                console.log(error);
            }
        }
        getMovieGenre();
    },[query])

    if(movies.length==0){
        return(
            <h1>
                Loading
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