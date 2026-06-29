# import os
# from dotenv import load_dotenv
# import requests

# def get_genre_list():

#     load_dotenv()

#     # cached_search = redis_client.get("genreList")
#     # if cached_search:
#     #     return json.loads(cached_search)

#     TMDB_TOKEN = os.getenv("TMDB_TOKEN")

#     url = "https://api.themoviedb.org/3/genre/movie/list?language=en"

#     headers = {
#         "accept" : "application/json",
#         "Authorization" : f"Bearer {TMDB_TOKEN}"
#     }

#     response = requests.get(url,headers=headers)
#     data = response.json()
#     genre_list = data["genres"]
#     # redis_client.set(
#     #     "genreList",
#     #     json.dumps(genre_list),
#     #     ex=86400
#     # )
#     return genre_list

# gList = get_genre_list()
# for genre in gList:
#     print(genre['name'])