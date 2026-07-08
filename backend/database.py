from sqlalchemy import create_engine # create engine is used to create the connection to our database
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

DB_USER = os.getenv("MYSQLUSER")
DB_PASSWORD = os.getenv("MYSQLPASSWORD")
DB_HOST = os.getenv("MYSQLHOST")
DB_PORT = os.getenv("MYSQLPORT")
DB_DATABASE = os.getenv("MYSQLDATABASE")

print(DB_HOST)
print(DB_PORT)
print(DB_USER)
print(DB_DATABASE)

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}"

# connection
engine = create_engine(DATABASE_URL)

#session
# autocommit = False => donot automatically save changes to the database
# bind = engine tells the sql which db to access while creating sessions
# find more about autoflush, why do we use it when we already do autocommit = False
SessionLocal = sessionmaker(autocommit=False, autoflush="False", bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Base
# create a base class that all your
Base = declarative_base()




