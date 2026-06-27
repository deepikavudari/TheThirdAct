import MovieCard from "./MovieCard";

export default function MovieSection({title,movies}){
    if(!movies)
        movies = [];
    return(
        <>
            <section className="movie-section">
                <h2>{title}</h2>
                <div className="movie-scroll">
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
            </section>
        </>
    )
}