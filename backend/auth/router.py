from fastapi import APIRouter

from backend.schemas.auth import (
    SignupRequest,
    SigninRequest,
    AuthResponse
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/signup")
async def signup(data: SigninRequest):

    return{
        "message": "Signup Router Working"
    }