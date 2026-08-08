from fastapi import APIRouter

from backend.schemas.auth import (
    SignupRequest,
    SigninRequest,
    AuthResponse
)
from backend.auth.service import (
    signup_user,
    signin_user
    )

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/signup")
async def signup(data: SignupRequest):

    return await signup_user(data)

@router.post("/signin")
async def signin(data: SigninRequest):
    return await signin_user(data)