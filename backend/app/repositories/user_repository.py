from typing import Optional
from bson import ObjectId

from app.core.db import get_database

class UserRepository:
    COLLECTION_NAME = "users"

    def __init__(self, database):
        self.collection = database[self.COLLECTION_NAME]

    async def create_user(self, user_data: dict) -> str:
        result = await self.collection.insert_one(user_data)
        return str(result.inserted_id)

    async def get_user(self, user_id: str) -> Optional[dict]:
        return await self.collection.find_one({"_id": ObjectId(user_id)})
    
    async def get_user_by_email(self, email: str) -> Optional[dict]:
        return await self.collection.find_one({"email": email})

    async def update_user(self, user_id: str, update_data: dict) -> bool:
        result = await self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data},
        )
        return result.modified_count > 0


