import "../styles/CastInfo.css";


export default function CastInfo({cast}){
    return(
        <>
        <div className="cast-card">
            <img
            src={`https://image.tmdb.org/t/p/w500${cast["profile"]}`}
            className="cast-image"
            alt = {cast["name"]}
            />

            <div className="cast-info">
                <h3>
                    {cast["name"]}
                </h3>

                <p>
                    {cast["character"]}
                </p>
            </div>
        </div>
            
        </>
    )
}