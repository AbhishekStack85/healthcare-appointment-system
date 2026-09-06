import os

from dotenv import load_dotenv
from pymongo import MongoClient
import certifi

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")

client = MongoClient(
    MONGODB_URL,
    tls=True,
    tlsCAFile=certifi.where()
)

db = client["health_app"]

print("MongoDB connection successful!")