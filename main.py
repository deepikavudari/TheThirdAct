from fastapi import FastAPI, Depends, HTTPException, status
import schemas,model,utils
from database import get_db
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from jose import jwt,JWTError
import os
from dotenv import load_dotenv
from fetchData import homePage
import requests
from fastapi.middleware.cors import CORSMiddleware
from fetch_movie_info import fetch_movie_info
from search_data import search

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
# creating a token that is valid for 2 hours, will create a refresh token in future
ACCESS_TOKEN_EXPIRY_MINUTES = 120

def create_access_token(data:dict):
    # copying the given data to prevent tampering the original data
    to_encode = data.copy()
    utcnow = datetime.now(timezone.utc)
    expiry_time = utcnow + timedelta(ACCESS_TOKEN_EXPIRY_MINUTES)
    to_encode.update({'exp':expiry_time})
    encode_jwt = jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return encode_jwt


@app.post("/signup")
def create_user(new_user : schemas.CreateUser, db : Session = Depends(get_db)):
    existing_user = db.query(model.User).filter(model.User.username==new_user.username).first()
    if existing_user:
        raise(HTTPException(status_code=401,detail="User already exists"))
    hashed_pass = utils.hash_password(new_user.password)
    new_user_info = model.User(
        username = new_user.username,
        email = new_user.email,
        role = new_user.role,
        hashed_password = hashed_pass
    )
    db.add(new_user_info)
    db.commit()
    db.refresh(new_user_info)

    return {
        'id' : new_user_info.id,
        'username' : new_user_info.username,
        'email' : new_user_info.email,
        'role' : new_user_info.role
    }

@app.post('/login')
def login_user(user : OAuth2PasswordRequestForm = Depends(), db : Session = Depends(get_db)):
    existing_user = db.query(model.User).filter(model.User.username==user.username).first()
    if not existing_user:
        raise HTTPException(status_code=401, detail="User does not exist")
    
    if not utils.verify_password(user.password,existing_user.hashed_password):
        raise HTTPException(status_code=401, detail="Wrong password")
    
    token_data = {'sub' : existing_user.username, 'role' : existing_user.role}
    token = create_access_token(token_data)
    return {"access_token" : token, "token_type" : "bearer"}


oauth2_scheme = OAuth2PasswordBearer(tokenUrl = "login")

def get_current_user(token : str = Depends(oauth2_scheme)):
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate credentials",headers={"WWW-Authenticate" : "Bearer"})

    try:
        payload = jwt.decode(token,SECRET_KEY,ALGORITHM)
        username : str = payload.get("sub")
        role : str = payload.get("role")
        if username is None or role is None:
            raise credential_exception
    # JWT error means something went wrong while creating, reading or verifying a jet token
    except JWTError:
        raise credential_exception
    
    return {"username" : username, "role" : role}
    

def req_roles(allowed_roles:list[str]):
    def role_checker(current_user : dict = Depends(get_current_user)):
        user_role = current_user['role']
        if user_role not in allowed_roles:
            raise HTTPException(status_code=403,detail="Not permitted")
        
        return current_user
    return role_checker

@app.get('/profile')
def get_profile(current_user : dict = Depends(get_current_user), db : Session = Depends(get_db)):
    user_list = db.query(model.List).filter(model.List.username==current_user['username']).all()
    
    return {
        "username" : f"{current_user['username']}",
        "lists" : user_list
        }

@app.post('/lists')
def create_list(new_list : schemas.CreateList, current_user : dict = Depends(get_current_user), db : Session = Depends(get_db)):
    add_list = model.List(
        list_name = new_list.list_name,
        username = current_user['username']
    )

    db.add(add_list)
    db.commit()
    db.refresh(add_list)

    return {
        "list_name" : add_list.list_name
    }

@app.get('/movies')
def root(data = Depends(homePage)):
    return data

@app.post('/list/{list_id}/{movie_id}')
def add_movie_to_list(list_id :int, movie_id : int, current_user :dict = Depends(get_current_user), db : Session = Depends(get_db)):
    existing_list = db.query(model.List).filter((model.List.id==list_id) & (model.List.username==current_user['username'])).first()

    if existing_list is None :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not matched or list doesnt exist")
    
    existing_movie = db.query(model.List_Movies).filter((model.List_Movies.list_id==existing_list.id) & (model.List_Movies.movie_id==movie_id)).first()

    if existing_movie is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Movie already exists")
    
    
    movie = model.List_Movies(
        movie_id = movie_id,
        list_id = existing_list.id
    )

    db.add(movie)
    db.commit()
    db.refresh(movie)

    return {
        "message" : "Movie added successfully",
        "movie_id" : movie.movie_id,
        "list_id" : movie.list_id
    }

@app.get("/movies/{movie_id}")
def get_info(movie_id : int):
    movie_details = fetch_movie_info(movie_id=movie_id)
    return movie_details

@app.get("/movies/search/{movie_name}")
def search_movie(movie_name : str):
    movies = search(movie_name)
    return movies

@app.get("/profile/{list_id}")
def get_list_movies(list_id : int, current_user :dict = Depends(get_current_user), db : Session = Depends(get_db)):
    existing_list = db.query(model.List).filter((model.List.id==list_id) & (model.List.username==current_user['username'])).first()

    if existing_list is None :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not matched or list doesnt exist")
    movies_list = db.query(model.List_Movies).filter(model.List_Movies.list_id==list_id).all()
    return {
        "list_name" : existing_list.list_name,
        "movies" : movies_list
    }






