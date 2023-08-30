from sqlalchemy import Integer,Column ,Float, String , ForeignKey,Sequence,Identity
from database import Base
from sqlalchemy.orm import relationship


class user(Base):
    __tablename__ = "User"
    email=Column(String(225),unique=True)
    account_id = Column(Integer,primary_key=True,autoincrement=True)
    name = Column(String(225))
    password=Column(String(225))
    phone=Column(String(225))
    date_of_birth=Column(String(225))
    branch=Column(String(225))
    resident=Column(String(225))
    IFSC_CODE=Column(String(225))
    balance=Column(Float,default=0.00)