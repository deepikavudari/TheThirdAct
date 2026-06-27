
export default async function fetch_movie_info(movie_id){
    try{
        const res = await fetch(`http://127.0.0.1:8000/movies/${movie_id}`);
        if(!res.ok){
            throw new Error("Failed to fetch movie details");
        }
        const data = await res.json();
        return data;

    }
    catch(error){
        console.log(error);
    }
}