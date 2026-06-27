import requests
import urllib.parse
import os
from dotenv import load_dotenv

load_dotenv()
def search(data : str):
    query_string = urllib.parse.quote(data)
    print(query_string)
    url = f"https://api.themoviedb.org/3/search/movie?query={query_string}&include_adult=false&language=en-US&page=1"
    TMDB_TOKEN = os.getenv("TMDB_TOKEN")

    headers = {
        "accept" : "application/json",
        "Authorization" : f"Bearer {TMDB_TOKEN}"
    }

    response = requests.get(url,headers=headers)
    parse_data = response.json()
    movie_data = parse_data['results']
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
