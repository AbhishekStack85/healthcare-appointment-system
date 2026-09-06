import os

from fastapi import APIRouter, HTTPException
from models.user import UserCreate
from models.login import LoginRequest
from database.connection import db
from pwdlib import PasswordHash
import jwt
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

password_hash = PasswordHash.recommended()

JWT_SECRET = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"


@router.post("/register")
def register(user: UserCreate):

    existing_user = db.users.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = password_hash.hash(user.password)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "role": user.role
    }

    result = db.users.insert_one(new_user)

    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id)
    }


@router.post("/login")
def login(user: LoginRequest):

    # Find user by email
    existing_user = db.users.find_one({"email": user.email})

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Verify password
    password_valid = password_hash.verify(
        user.password,
        existing_user["password"]
    )

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Create JWT token
    token_data = {
        "user_id": str(existing_user["_id"]),
        "email": existing_user["email"],
        "role": existing_user["role"]
    }

    token = jwt.encode(
        token_data,
        JWT_SECRET,
        algorithm=ALGORITHM
    )

    return {
    "message": "Login successful",
    "access_token": token,
    "token_type": "bearer",
    "role": existing_user["role"]
}