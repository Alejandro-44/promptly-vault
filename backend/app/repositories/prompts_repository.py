from pymongo.collection import Collection
from bson.objectid import ObjectId

from app.schemas.prompt_schema import Prompt

class PromptsRepository:

    def __init__(self, database):
        self.collection: Collection[Prompt] = database["prompts"]

    async def get(self, filters: dict = {}) -> list[Prompt]:
        return await self.collection.find(filters).to_list()

    async def get_by_id(self, prompt_id: str) -> Prompt:
        return await self.collection.find_one({ "_id": ObjectId(prompt_id) })

    async def create(self, prompt_data: dict):
        result = await self.collection.insert_one(prompt_data)
        return str(result.inserted_id)

    async def update(self, prompt_id: str, user_id: str, update_data: dict):
        result = await self.collection.update_one({ "_id": ObjectId(prompt_id), "user_id": ObjectId(user_id) }, { "$set": update_data  })
        return result.modified_count > 0

    async def delete(self, prompt_id: str, user_id: str):
        result = await self.collection.delete_one({ "_id": ObjectId(prompt_id), "user_id": ObjectId(user_id) })
        return result.deleted_count > 0
 