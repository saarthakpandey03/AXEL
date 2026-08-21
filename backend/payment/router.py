from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.payment.service import (
    create_plan_order,
    verify_plan_payment,
)


router = APIRouter(
    prefix="/payment",
    tags=["Payment"]
)


class CreateOrderRequest(BaseModel):
    plan: str


class VerifyPaymentRequest(BaseModel):
    plan: str
    razorpay_payment_id: str
    razorpay_order_id: str
    razorpay_signature: str


@router.post("/create-order")
async def create_order(data: CreateOrderRequest):

    try:

        return create_plan_order(
            plan=data.plan
        )

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


@router.post("/verify")
async def verify_payment(
    data: VerifyPaymentRequest
):

    try:

        return verify_plan_payment(
            plan=data.plan,
            razorpay_payment_id=data.razorpay_payment_id,
            razorpay_order_id=data.razorpay_order_id,
            razorpay_signature=data.razorpay_signature,
        )

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )