import requests
import os
from dotenv import load_dotenv
from fastapi import status, HTTPException

def get_recos(movie_id : int):
    load_dotenv()
    TMDB_TOKEN = os.getenv("TMDB_TOKEN")

    url = f"https://api.themoviedb.org/3/movie/{movie_id}/recommendations?language=en-US&page=1"

    headers = {
        "accept" : "application/json",
        "Authorization" : f"Bearer {TMDB_TOKEN}"
    }

    response = requests.get(url,headers=headers)
    parse_data = response.json()
    movie_data = parse_data['results']

    if not movie_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movie recommendations not found!")

    movies_list = []
    # fetch movies for all ages only
    count = 0
    for movie in movie_data:
        if (not movie["adult"]) & (count<20):
            new_movie = {
            "id" : movie["id"],
            "title" : movie["title"],
            "release_date" : movie["release_date"],
            "rating" : movie["vote_average"],
            "poster" : movie["poster_path"]
            }
            count+=1
            movies_list.append(new_movie)

    return movies_list

