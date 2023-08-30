from fastapi import Depends,HTTPException,status
from jose import JWTError , jwt
from fastapi.security import OAuth2PasswordBearer
import token
oauth2_scheme=OAuth2PasswordBearer(tokenUrl="token")
def get_current_user(data:str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "bearer "},
    )
    token.verify(data,credentials_exception)