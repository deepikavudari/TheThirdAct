from database import engine, Base
import model
# telling sql database to create all the tables mentioned in the model.py file
Base.metadata.create_all(bind = engine)