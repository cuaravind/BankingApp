from fastapi import FastAPI, HTTPException,status,Depends
import uvicorn
import  models,schemas,database
from database import engine
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import requests,json
from typing import List

app = FastAPI()
models.Base.metadata.create_all(engine)
get_db = database.get_db
@app.post('/thirdparty',status_code=status.HTTP_201_CREATED)
def create_user (request:schemas.newuser,db : Session=Depends(get_db)):
    new_user= models.user(account_no=request.account_no,name=request.name,Bank_name=request.Bank_name,branch=request.branch,IFSC_CODE=request.IFSC_CODE,adder_id=request.adder_id)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
@app.get('/thirdparty/{id}',response_model=List[schemas.thirdparty])
def getuser(id:int, db : Session=Depends(get_db)):
    user=db.query(models.user).filter(models.user.adder_id == id ).all()
    
    if not user :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f" {id} do't have a third party")
    return user

@app.put('/thirdparty/update/{id}/{account_no}')
def update(id:int,account_no:int,request:schemas.thirdparty,db:Session = Depends(get_db)):
    # db.query(models.user).filter(models.user.account_no==request.account_no).first()
    # if not blog:
    #      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f'detail not found id {id}')
    user=db.query(models.user).filter(models.user.adder_id==id,models.user.account_no==account_no).first()
    user.name=request.name
    user.account_no=request.account_no
    user.adder_id=request.adder_id
    user.Bank_name=request.Bank_name
    user.branch=request.branch
    user.IFSC_CODE=request.IFSC_CODE
    db.commit()
    return "updated"

@app.delete('/thirdparty/delete/{adder_id}/{account_no}')
def dele(adder_id:int,account_no:int,db:Session = Depends(get_db)):
    db.query(models.user).filter(models.user.account_no==account_no, models.user.adder_id==adder_id).delete(synchronize_session=False)
    # if not blog:
    #      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f'detail not found id {id}')
    # db.query(models.user).filter(models.user.adder_id==id).update(request.dict())  
    db.commit()
    return 'Done'

class AmountEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, schemas.Amount):
            return str(obj.amount)
        return super().default(obj)

@app.put('/thirdparty/transaction/{adder_id}/{account_no}')
def balance(adder_id: int,account_no:int, amount: schemas.Amount, db: Session = Depends(get_db)):
    user = db.query(models.user).filter(models.user.account_no == account_no,models.user.adder_id==adder_id).update(amount.dict())
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.commit()
    if user:
        details={
        "sender_account_number":adder_id,
        "amount":amount,
        "receiver_account_number":account_no
    }
    transaction=json.dumps(details,cls=AmountEncoder)
    response=requests.post("http://localhost:5000/tpt",data=transaction)
    try:
        response_data=json.loads(response.text)
    except:
        response_data=None
    return response_data

origins=[
    "http://localhost:4200",
    "http://localhost:5200"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)
if __name__=="__main__":
    uvicorn.run("main:app",host="127.0.0.1",port=5200,reload=True,access_log=False)
