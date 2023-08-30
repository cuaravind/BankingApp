from fastapi import APIRouter,Depends,status,HTTPException
import schemas, database, models 
from sqlalchemy.orm import Session
from hashing import Hash
import requests
import json
get_db=database.get_db

def get_all(db):
    user = db.query(models.user).all()
    return user

def create_user (request:schemas.user,db:Session):
   
    new_user= models.user(name=request.name,email=request.email,password=Hash.bcrypt(request.password),phone=request.phone,branch=request.branch,date_of_birth=request.date_of_birth,resident=request.resident,IFSC_CODE=request.IFSC_CODE)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def show(account_id, db : Session):

    user = db.query(models.user).filter(models.user.account_id == account_id).first()
    
    if not user :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f'detail of {id} not available')
    
        
    return user

def add_balance(user_id: int, Amount, db: Session = Depends(get_db)):
    
    user = db.query(models.user).filter(models.user.account_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.balance += Amount.amount
    db.commit()
    return user

def transaction (request:schemas.TransactionDetails,db:Session=Depends(get_db)):

    recei_user=db.query(models.user).filter(models.user.account_id==request.receiver_account_number).first()
    sender_user=db.query(models.user).filter(models.user.account_id==request.sender_account_number).first()
    if(sender_user.balance<request.amount):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Insufficiant balance")
    if not recei_user:
    
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Account not found")
    recei_user.balance += request.amount
    
    sender_user.balance -= request.amount
    db.commit()
    
    
def thirdtransaction (request:schemas.Thirdparty,db:Session=Depends(get_db)):

    sender_user=db.query(models.user).filter(models.user.account_id==request.sender_account_number).first()
    if(sender_user.balance<request.amount):
        raise HTTPException(status_code=404,detail="Insufficiant balance")
    
    sender_user.balance -= request.amount
    db.commit()


# def transaction(sender_account_number: int, amount: int, receiver_account_number: int, db: Session = Depends(get_db)):
#     sender_user = db.query(models.user).filter(models.user.account_id == sender_account_number).first()
#     receiver_user = db.query(models.user).filter(models.user.account_id == receiver_account_number).first()
#     if not receiver_user:
#         raise HTTPException(status_code=404, detail="Receiver account not found")
#     sender_user.balance -= amount
#     receiver_user.balance += amount
#     db.commit()