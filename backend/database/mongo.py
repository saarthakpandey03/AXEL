import os

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv


load_dotenv()


MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv(
    "DATABASE_NAME",
    "axel"
)


if not MONGO_URI:
    raise RuntimeError(
        "MONGO_URI environment variable is not set."
    )


client = AsyncIOMotorClient(
    MONGO_URI,
    serverSelectionTimeoutMS=10000,
    connectTimeoutMS=10000,
)


db = client[DATABASE_NAME]


users_collection = db["users"]
sessions_collection = db["sessions"]
history_collection = db["history"]