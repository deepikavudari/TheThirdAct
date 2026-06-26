import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import "../styles/MovieDetails.css";
import CastInfo from "../components/CastInfo";

export default function MovieDetails(){
    const {movie_id} = useParams();
    const [movieInfo, setMovieInfo] = useState(null);
    useEffect(()=>{
        async function fetch_movie_info(movie_id){
            try{
                const res = await fetch(`http://127.0.0.1:8000/movies/${movie_id}`);
                if(!res.ok){
                    throw new Error("Failed to fetch movie details");
                }
                const data = await res.json();
                setMovieInfo(data);

            }
            catch(error){
                console.log(error);
            }
        }
        fetch_movie_info(movie_id);
    },[movie_id])

    if(!movieInfo){
        return <h2>Loading...</h2>;
    }

    

    return(
        <>
        <div className="movie-details">


            <div className="poster-container">

                <img
                    className="details-poster"
                    src={`https://image.tmdb.org/t/p/w500${movieInfo[0]["posterUrl"]}`}
                    alt={movieInfo[0]["title"]}
                />

            </div>



            <div className="movie-content">


                <h1>
                    {movieInfo[0]["title"]}
                </h1>


                <div className="movie-meta">

                    <span>
                        ⭐ {movieInfo[0]["rating"].toFixed(2)}
                    </span>

                    <span>
                        {movieInfo[0]["release_date"]}
                    </span>

                    <span>
                        {movieInfo[0]["duration"]} min
                    </span>

                </div>



                <p className="description">

                    {movieInfo[0]["description"]}

                </p>



                <div className="genres">

                    {
                        movieInfo[0]["genres"].map((genre)=>(
                            <span key={genre["id"]}>
                                {genre["name"]}
                            </span>
                        ))
                    }

                </div>


                <button className="add-btn">
                    + Add to List
                </button>


            </div>


        </div>

        <h2 className="cast">Cast</h2>
        
        <div className="cast-container">
            {
            movieInfo[1].map((cast)=>{
                return(
                    <CastInfo
                        key = {cast["id"]}
                        cast = {cast}
                    />
                )
                
            })
        }
        </div>
        
        
        </>
    )
}