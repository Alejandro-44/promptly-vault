from typing import Optional
from bson import ObjectId
from pymongo.collection import Collection

from app.schemas.user_schema import User

class UserRepository:
    def __init__(self, database):
        self.collection: Collection[User] = database["users"]

    async def create(self, user_data: User) -> str:
        result = await self.collection.insert_one(user_data)
        return str(result.inserted_id)
    
    async def get_by_email(self, email: str) -> Optional[User]:
        return await self.collection.find_one({ "email": email })
    
    async def get_by_id(self, user_id: str) -> Optional[User]:
        return await self.collection.find_one({ "_id": ObjectId(user_id) })

    async def update(self, user_id: str, update_data: dict) -> bool:
        result = await self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data},
        )
        return result.modified_count > 0
