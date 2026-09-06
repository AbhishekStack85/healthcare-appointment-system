import os

import jwt
from dotenv import load_dotenv
from fastapi import HTTPException, Header

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"


def get_current_user(authorization: str = Header(None)):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization token required"
        )

    try:
        token = authorization.replace("Bearer ", "")

        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=[ALGORITHM]
        )

        return payload

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )