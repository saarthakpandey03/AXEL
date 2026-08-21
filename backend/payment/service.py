import os
import razorpay

from dotenv import load_dotenv


load_dotenv()


# =========================================================
# Razorpay Configuration
# =========================================================

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")


if not RAZORPAY_KEY_ID:
    raise RuntimeError(
        "RAZORPAY_KEY_ID is missing from .env"
    )

if not RAZORPAY_KEY_SECRET:
    raise RuntimeError(
        "RAZORPAY_KEY_SECRET is missing from .env"
    )


client = razorpay.Client(
    auth=(
        RAZORPAY_KEY_ID,
        RAZORPAY_KEY_SECRET,
    )
)


# =========================================================
# Plans
# =========================================================

PLANS = {
    "pro": {
        "name": "Pro",
        "amount": 49900,  # ₹499
    },

    "ultra": {
        "name": "Ultra",
        "amount": 99900,  # ₹999
    },
}


# =========================================================
# Create Order
# =========================================================

def create_plan_order(
    plan: str,
    user_id: str | None = None,
):

    if plan not in PLANS:
        raise ValueError(
            "Invalid plan selected."
        )


    selected_plan = PLANS[plan]


    # Unique receipt
    receipt_suffix = user_id or "guest"

    receipt = (
        f"axel_{plan}_{receipt_suffix}_"
        f"{os.urandom(4).hex()}"
    )


    order = client.order.create({
        "amount": selected_plan["amount"],
        "currency": "INR",
        "receipt": receipt,

        "notes": {
            "plan": plan,
            "user_id": user_id or "",
        },
    })


    return {
        "order_id": order["id"],
        "amount": selected_plan["amount"],
        "currency": "INR",
        "plan": plan,
        "plan_name": selected_plan["name"],
        "key_id": RAZORPAY_KEY_ID,
    }


# =========================================================
# Verify Payment
# =========================================================

# def verify_plan_payment(
#     plan: str,
#     razorpay_payment_id: str,
#     razorpay_order_id: str,
#     razorpay_signature: str,
# ):

#     if plan not in PLANS:
#         raise ValueError(
#             "Invalid plan selected."
#         )


#     if not razorpay_payment_id:
#         raise ValueError(
#             "Payment ID is required."
#         )

#     if not razorpay_order_id:
#         raise ValueError(
#             "Order ID is required."
#         )

#     if not razorpay_signature:
#         raise ValueError(
#             "Payment signature is required."
#         )


#     try:

#         client.utility.verify_payment_signature({
#             "razorpay_order_id": razorpay_order_id,
#             "razorpay_payment_id": razorpay_payment_id,
#             "razorpay_signature": razorpay_signature,
#         })

#     except Exception as error:

#         print(
#             "Razorpay verification error:",
#             error
#         )

#         raise ValueError(
#             "Payment verification failed."
#         )


#     return {
#         "success": True,
#         "message": "Payment verified successfully.",
#         "plan": plan,
#         "payment_id": razorpay_payment_id,
#         "order_id": razorpay_order_id,
#     }