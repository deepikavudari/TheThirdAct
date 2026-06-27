import requests
import os
from dotenv import load_dotenv

load_dotenv()

def fetch_movies(url : str):

    TMDB_TOKEN = os.getenv("TMDB_TOKEN")

    headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {TMDB_TOKEN}"
    }

    
    response = requests.get(url, headers=headers)

    # error handling
    response.raise_for_status()

    parse_data = response.json()
    movie_data = parse_data["results"]
    movies_list = []
    # fetch movies for all ages only
    for movie in movie_data:
        if not movie["adult"]:
            new_movie = {
            "id" : movie["id"],
            "title" : movie["title"],
            "release_date" : movie["release_date"],
            "rating" : movie["vote_average"],
            "poster" : movie["poster_path"]
            }
            movies_list.append(new_movie)

    return movies_list


def homePage():
    

    urls = {
        "now_playing" : 
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",

        "popular" : 
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",

        "top_rated" :
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",

        "upcoming" :
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
    }
    
    result = []
    for name,url in urls.items():
        arr = fetch_movies(url)
        result.append(arr)

    return result





