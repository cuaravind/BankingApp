from fastapi import APIRouter,Depends , HTTPException,status
import schemas,database,models
from sqlalchemy.orm import session
from hashing import Hash
from datetime import timedelta
from .token import create_access_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    tags=["authendication"]
)
@router.post('/login')
def login(request:OAuth2PasswordRequestForm=Depends(),db:session=Depends(database.get_db)):
    user = db.query(models.user).filter(models.user.email==request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"Invalid credentials")
    if not Hash.verify(user.password,request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"Incorrect password")    
    access_token = create_access_token(data={"sub": user.email,"id":user.account_id,  "name":user.name})
    return {"access_token": access_token, "token_type": "bearer"}
# @router.get('/login/user')
# def show(account_id, db : Session):

#     user = db.query(models.user).filter(models.user.account_id == account_id).first()
    
#     if not user :
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f'detail of {id} not available')
    
        
#     return user