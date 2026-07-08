import { useState,useEffect } from "react";
import MovieSection from "../components/MovieSection";


export default function Home(){
    const [movies,setMovies] = useState([]);
    useEffect(()=>{
        async function fetchMovies(){
            const API_URL = import.meta.env.BACKEND_URL;
            try{
                const res = await fetch(`${API_URL}/movies`);
            

                if(!res.ok){
                    throw new Error("Failed to fetch movies");
                }

                const data = await res.json();
                setMovies(data);
            }
            catch(error){
                console.log(error);
            }
        }

        fetchMovies();

    },[])


    return(
        <main>
            <h1 className="hero-title">
                THE THIRD ACT
            </h1>

            <MovieSection
                title = "Now Playing"
                movies = {movies[0]}
            />

            <MovieSection
                title = "Popular"
                movies = {movies[1]}
            />

            <MovieSection
                title = "Top rated"
                movies = {movies[2]}
            />

            <MovieSection
                title = "Upcoming"
                movies = {movies[3]}
            />


        </main>
    )

    
}