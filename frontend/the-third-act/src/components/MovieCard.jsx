import { Link } from 'react-router-dom';

export default function MovieCard({id,poster, title, rating}){
    return (
        <Link to={`/movies/${id}`}>
            <div className="movie-card">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${poster}`} 
                    alt={title}
                />
                <div className="movie-info">
                    <p className="movie-title">{title}</p>
                    <p className="movie-rating">
                        ⭐ {rating.toFixed(2)}
                    </p>
                </div>
            </div>
        </Link>
    )
}

