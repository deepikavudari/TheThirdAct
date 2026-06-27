from database import Base
from sqlalchemy import Integer, String, Column


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))
    role = Column(String(50),default="user")

class List(Base):
    __tablename__ = "list"

    id = Column(Integer, primary_key = True, index = True)
    username = Column(String(255), index=True)
    list_name = Column(String(255), index=True)


# add unique constraint

class List_Movies(Base):
    __tablename__ = "list_movies"
    
    id = Column(Integer,index=True,unique=True, primary_key = True)
    movie_id = Column(Integer,index=True)
    list_id = Column(Integer,index=True)
    




