import { useState, useEffect, useContext

 } from "react"
import { useParams } from "react-router-dom";
import "../styles/MovieDetails.css";
import CastInfo from "../components/CastInfo";
import  AddToListModal from "../components/AddToListModal";
import { AuthContext } from "../components/AuthContext";
import fetch_movie_info from "../utils/fetch_movie_info";
import MovieSection from "../components/MovieSection";

export default function MovieDetails(){
    const {movie_id} = useParams();
    const [movieInfo, setMovieInfo] = useState(null);
    const [movieRecos, setMovieRecos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const {token,lists} = useContext(AuthContext)
    useEffect(()=>{
        async function getMovie(){
            const data = await fetch_movie_info(movie_id);

            setMovieInfo(data);
        }
        getMovie();
    },[movie_id])

    useEffect(()=>{
        async function getRecos(){
            const API_URL = import.meta.env.VITE_API_URL;
            const res = await fetch(`${API_URL}/recos/${movie_id}`);
            const result = await res.json();
            if(!res.ok){
                throw new Error(result.detail);
            }
            setMovieRecos(result)
            console.log(result);
        }
        getRecos()
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


                <button 
                className="add-btn"
                onClick={()=>setShowModal(true)}
                >
                    + Add to List
                </button>

                {
                    showModal && (
                        <AddToListModal
                        closeModal = {()=>setShowModal(false)}
                        token = {token}
                        lists = {lists}
                        movie_id={movie_id}
                        />
                    )
                }


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

        <MovieSection
            title = "Similar movies"
            movies = {movieRecos}
        />
        
        
        </>
    )
}