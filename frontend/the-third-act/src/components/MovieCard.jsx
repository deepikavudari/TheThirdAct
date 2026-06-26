
export default function MovieCard({poster, title, rating}){
    return (
        <div className="movie-card">
            <img 
                src={`https://image.tmdb.org/t/p/w500${poster}`} 
                alt={title}
            />

            <div className="movie-info">
                <p className="movie-title">{title}</p>
                <p className="movie-rating">
                    {rating.toFixed(2)}
                </p>
            </div>
        </div>
    )
}

