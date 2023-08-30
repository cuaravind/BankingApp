from sqlalchemy import Integer,Column ,Float, String ,Date
from database import Base
from sqlalchemy.orm import relationship
from datetime import date
class transaction(Base):
    __tablename__ = "Transaction"
    transaction_id=Column(Integer,primary_key=True)
    sender_account_number = Column(Integer)
    amount= Column(Float)
    receiver_account_number = Column(Integer)
    date=Column(Date,default=date.today())
    