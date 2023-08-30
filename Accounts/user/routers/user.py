from fastapi import APIRouter,Depends,status,HTTPException
import schemas, database, models , oauth2
from sqlalchemy.orm import Session
from hashing import Hash
from repository import user
from oauth2 import get_current_user
from typing import List

router = APIRouter(
    tags=["Users"]
)

get_db = database.get_db

@router.get('/new',response_model=list[schemas.showuser])
def all(db : Session=Depends(get_db)):
    return user.get_all(db)

@router.get('/user/{id}',status_code=200,response_model=schemas.showuser)
def show(id, db : Session=Depends(get_db)):   
    return user.show(id,db)

@router.post('/new',status_code=status.HTTP_201_CREATED)
def create(request:schemas.user ,db : Session=Depends(get_db)):
    return user.create_user(request,db)    

@router.get('/usersummary/{id}',status_code=200,response_model=schemas.showsummary)
def show(id, db : Session=Depends(get_db)):   
    return user.show(id,db)


@router.put('/users/{user_id}')
def add_balance(user_id: int, amount: schemas.Amount, db: Session = Depends(get_db)):
    return user.add_balance(user_id,amount,db)

@router.put('/user/transaction')
def transaction (request:schemas.TransactionDetails,db:Session=Depends(get_db)):
    return user.transaction(request,db)

@router.put('/user/thirdparty')
def thirdtransaction (request:schemas.Thirdparty,db:Session=Depends(get_db)):
    return user.thirdtransaction(request,db)

# @router.post("/transaction")
# def transaction_details(transaction_details: schemas.TransactionDetails, db: Session = Depends(get_db)):
#     transaction(transaction_details.sender_account_number, transaction_details.amount, transaction_details.receiver_account_number, db=db)