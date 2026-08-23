from fastapi import (
    APIRouter,
    HTTPException,
    status
)

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


@router.post(
    "/signup",
    response_model=AuthResponse
)
async def signup(data: SignupRequest):

    try:

        return await signup_user(data)

    except HTTPException:
        raise

    except Exception as e:

        print("Signup Error:", str(e))

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to create account. Please try again."
        )


@router.post(
    "/signin",
    response_model=AuthResponse
)
async def signin(data: SigninRequest):

    try:

        return await signin_user(data)

    except HTTPException:
        raise

    except Exception as e:

        print("Signin Error:", str(e))

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to sign in. Please try again."
        )