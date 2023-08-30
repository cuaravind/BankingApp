from pydantic import BaseModel
class newuser(BaseModel):
    name :str
    Bank_name:str
    branch:str
    IFSC_CODE:str
    adder_id:int
    account_no:int
    class Config():
        orm_mode=True
class thirdparty(BaseModel):
    name :str
    Bank_name:str
    branch:str
    IFSC_CODE:str
    account_no:int
    adder_id:int
    class Config():
        orm_mode=True
class update(BaseModel):
    account_no:int
    adder_id:int
class up(BaseModel):
    name :str
    branch:str
    IFSC_CODE:str
    class Config():
        orm_mode=True
class Amount(BaseModel):
   amount:float
class tpt(BaseModel):
    account_no:int
    adder_id:int
    amount:float