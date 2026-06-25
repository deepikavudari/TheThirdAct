from pydantic import BaseModel,EmailStr

class CreateUser(BaseModel):
    username : str
    email : EmailStr
    password : str
    role : str

class LoginUser(BaseModel):
    username : str
    password : str

# schema defines the data that our fastapi returns 
# for example i am fetching movie data from an extrenal api but instead of returing that json directly to my frontend, i only send the relevant data using the Movie schema, i convert that data to an instance of movie class so that my frontend definitely knows a certain field exists and the data sent it only relevant data
class Movie(BaseModel):
    id : int
    title : str
    posterUrl : str
    rating : float
    description : str
    genres : dict
    release_date : str
    duration : str

class CreateList(BaseModel):
    list_name : str






