
export default async function fetch_movie_info(movie_id){
    try{
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/movies/${movie_id}`);
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