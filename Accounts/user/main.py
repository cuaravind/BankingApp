from fastapi import FastAPI
import  models
from database import engine
from routers import user, authendication
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

models.Base.metadata.create_all(engine)
app.include_router(user.router)

app.include_router(authendication.router)

origins=[
    "http://localhost:4200",
    "http://localhost:8000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)