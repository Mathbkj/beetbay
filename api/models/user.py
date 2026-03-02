
from models.db import database
from sqlalchemy.orm import Mapped, mapped_column

class User(database.Model):
    id:Mapped[int] = mapped_column(primary_key=True)
    username:Mapped[str] = mapped_column(unique=True)
    password:Mapped[str]