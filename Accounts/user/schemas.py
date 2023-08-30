from pydantic import BaseModel
from typing import List , Optional

class blog(BaseModel):
   title:str
   body:str

class user(BaseModel):
   name:str
   email:str
   password:str
   phone:str
   branch:str
   date_of_birth:str
   resident:str
   IFSC_CODE:str
   
   
class showuser(BaseModel):
   name:str
   date_of_birth:str
   email:str
   password:str
   phone:str
   account_id:int
   branch:str
   resident:str
   IFSC_CODE:str
   # account_no:int
   # blog :List
   class Config():
      orm_mode=True
class showsummary(BaseModel):
   account_id:int
   balance:float
   branch:str
   IFSC_CODE:str
   class Config():
      orm_mode=True
class showblog(BaseModel):
   title:str
   body:str
   # creator:showuser
   class Config():
      orm_mode=True
class Amount(BaseModel):
   amount:float

class Login(BaseModel):
   email:str
   password:str

class Token(BaseModel):
   access_token: str
   token_type: str


class TokenData(BaseModel):
   email: Optional[str] = None
   
class TransactionDetails(BaseModel):
    sender_account_number: int
    amount: int
    receiver_account_number: int
    class Config():
      orm_mode=True
      
class Thirdparty(BaseModel):
    sender_account_number: int
    amount: int
    
    class Config():
      orm_mode=True