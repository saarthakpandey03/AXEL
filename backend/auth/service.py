from datetime import datetime, timezone

from fastapi import HTTPException, status

from backend.schemas.auth import SignupRequest, SigninRequest
from backend.database.mongo import users_collection
from backend.auth.security import (
    hash_password,
    create_access_token,
    verify_password,
)


async def signup_user(data: SignupRequest):

    # Check if email already exists
    existing_user = await users_collection.find_one(
        {
            "email": data.email
        }
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered."
        )

    # Hash password
    hashed_password = hash_password(
        data.password
    )

    # Create user document
    user = {
        "name": data.name,
        "email": data.email,
        "password": hashed_password,
        "provider": "local",
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }

    # Insert user into MongoDB
    result = await users_collection.insert_one(
        user
    )

    # Generate JWT
    token = create_access_token(
        {
            "user_id": str(result.inserted_id),
            "email": data.email,
        }
    )

    return {
        "success": True,
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(result.inserted_id),
            "name": data.name,
            "email": data.email,
        },
    }


async def signin_user(data: SigninRequest):

    user = await users_collection.find_one(
        {
            "email": data.email
        }
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    if not verify_password(
        data.password,
        user["password"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    access_token = create_access_token(
        {
            "user_id": str(user["_id"]),
            "email": user["email"],
        }
    )

    return {
        "success": True,
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
        },
    }