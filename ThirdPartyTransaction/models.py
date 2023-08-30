from sqlalchemy import Integer,Column ,Float, String , ForeignKey,Sequence,Identity
from database import Base
from sqlalchemy.orm import relationship

class user(Base):
    __tablename__ = "tpt"
    id=Column(Integer,primary_key=True,autoincrement=True)
    adder_id=Column(Integer)
    account_no=Column(Integer)
    name = Column(String(225))
    Bank_name=Column(String(225))
    branch=Column(String(225))
    IFSC_CODE=Column(String(225))
    amount=Column(Float,default=0)
    