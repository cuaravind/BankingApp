from pydantic import BaseModel
from datetime import date
class transaction(BaseModel):
    sender_account_number: int
    amount: float
    receiver_account_number: int
    

class TransferRequest(BaseModel):
    sender_account_number: int
    receiver_account_number: int
    amount: float
class trans(BaseModel):
    transaction_id: int
    sender_account_number:int
    amount:float
    receiver_account_number:int
    date:date
    class Config():
        orm_mode=True
class transfer(BaseModel):
    sender_account_number: int
    amount: float
    receiver_account_number: int