from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    name: str = Field(
        ...,
        min_length=2,
        max_length=50,
        description="User Full Name"
    )

    email: EmailStr

    password: str = Field(
        ...,
        min_length=8,
        max_length=64,
        description="User Password"
    )


class SigninRequest(BaseModel):
    email: EmailStr

    password: str = Field(
        ...,
        min_length=8,
        max_length=64
    )


class AuthResponse(BaseModel):
    access_token: str

    token_type: str = "bearer"

    user: dict