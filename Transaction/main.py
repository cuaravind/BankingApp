from fastapi import FastAPI, HTTPException,status,Depends
import uvicorn
import  models,schemas,database
from database import engine
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import requests,json
from typing import List
from datetime import date

app = FastAPI()
get_db = database.get_db

models.Base.metadata.create_all(engine)
@app.post('/new',status_code=status.HTTP_201_CREATED)
def create_user (request:schemas.TransferRequest,db : Session=Depends(get_db)):
    
    details={
        "sender_account_number":request.sender_account_number,
        "amount":request.amount,
        "receiver_account_number":request.receiver_account_number
        
        
    }
    response=requests.put("http://localhost:8000/user/transaction", data=json.dumps(details))
    try:
        response.raise_for_status()  # Raise an HTTPError for 4xx or 5xx status codes
    except requests.exceptions.HTTPError as e:
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    response_data = response.json()
    new_user= models.transaction(sender_account_number=request.sender_account_number,receiver_account_number=request.receiver_account_number,amount=request.amount)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return response_data

@app.get('/new1/{id}',response_model=List[schemas.trans])
def getuser(id:int, db : Session=Depends(get_db)):
    user=db.query(models.transaction).filter((models.transaction.sender_account_number == id ) | (models.transaction.receiver_account_number == id )).all()
    
    if not user :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f'transaction of {id} not available')
    return user

@app.post('/tpt',status_code=status.HTTP_201_CREATED)
def create_user (request:schemas.transfer,db : Session=Depends(get_db)):
    
    details={
        "sender_account_number":request.sender_account_number,
        "amount":request.amount,
        
        
    }
    response=requests.put("http://localhost:8000/user/thirdparty",data=json.dumps(details))
    try:
        response_data=json.loads(response.text)
    except:
        response_data=None
        
    new_user= models.transaction(sender_account_number=request.sender_account_number,receiver_account_number=request.receiver_account_number,amount=request.amount)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return response_data


@app.get('/transadate/{id}', response_model=List[schemas.trans])
def getuser(
    id: int, 
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db)
):
    query = db.query(models.transaction).filter(
        (models.transaction.sender_account_number == id) | 
        (models.transaction.receiver_account_number == id)
    )
    
    # if id:
    #     query = query.filter(models.transaction.sender_account_number == id)
    # if id:
    #     query = query.filter(models.transaction.receiver_account_number == id)
    
        
    query = query.filter(models.transaction.date >= start_date,models.transaction.date <= end_date)
    # if end_date:
        
    #     query = query.filter(models.transaction.date <= end_date)
    
    user = query.all()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'transaction of {id} not available')
    return user

origins=[
    "http://localhost:4200",
    "http://localhost:5000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

if __name__=="__main__":
    uvicorn.run("main:app",host="127.0.0.1",port=5000,reload=True,access_log=False)
