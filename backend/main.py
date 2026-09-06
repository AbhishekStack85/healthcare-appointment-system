from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.doctors import router as doctors_router
from routes.appointments import router as appointments_router

app = FastAPI()

# React frontend ko FastAPI access karne ki permission
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://healthcare-appointment-system-ten.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(doctors_router)
app.include_router(appointments_router)


@app.get("/")
def home():
    return {"message": "Health App API is running"}