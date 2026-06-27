import os
from dotenv import load_dotenv
import requests


load_dotenv()


def get_movieDetails(movie_id : int):
    TMDB_TOKEN = os.getenv("TMDB_TOKEN")
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?language=en-US"
    headers = {
        "accept" : "application/json",
        "Authorization" : f"Bearer {TMDB_TOKEN}"
    }

    response = requests.get(url,headers=headers)
    data = response.json()
    movie_info = {
        "id" : movie_id,
        "title" : data["title"],
        "posterUrl" : data["poster_path"],
        "rating" : data["vote_average"],
        "description" : data["overview"],
        "release_date" : data["release_date"],
        "genres" : data["genres"],
        "duration" : data["runtime"],
    }
    return movie_info

def get_credits(movie_id : int):
    TMDB_TOKEN = os.getenv("TMDB_TOKEN")
    url = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?language=en-US"
    headers = {
        "accept" : "application/json",
        "Authorization" : f"Bearer {TMDB_TOKEN}"
    }

    response = requests.get(url,headers=headers).json()
    cast = response["cast"][:25]
    top_25 = []
    for actor in cast:
        new_cast = {
            "id" : actor["id"],
            "name" : actor["name"],
            "character" : actor["character"],
            "profile" : actor["profile_path"]
        }
        top_25.append(new_cast)
    return top_25
    

def fetch_movie_info(movie_id : int):
    cast = get_credits(movie_id=movie_id)
    info = get_movieDetails(movie_id=movie_id)
    return [info, cast]

