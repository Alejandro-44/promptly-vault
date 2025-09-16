from typing import List

from pymongo.collection import Collection
from bson.objectid import ObjectId

from app.schemas.prompt_schema import Prompt
from helpers.prompt_parser import document_to_prompt

class PromptsRepository:
    COLLECTION_NAME = "prompts"

    def __init__(self, database):
        self.collection: Collection[Prompt] = database[self.COLLECTION_NAME]

    async def get(self) -> list[Prompt]:
        prompts = []
        prompts_response = await self.collection.find().to_list()
        for document in prompts_response:
            prompt = document_to_prompt(document)
            prompts.append(prompt)
        return prompts

    async def get_by_id(self, id: str) -> Prompt:
        object_id = ObjectId(id)
        return await self.collection.find_one({ "_id": object_id })
    
    async def create(self, prompt_data):
        result = await self.collection.insert_one(prompt_data)
        return str(result.inserted_id)

    async def update(self, id: str, update_data: dict):
        return await self.collection.update_one({ "_id": ObjectId(id) }, { "$set": update_data  })
 