from typing import List
from datetime import datetime

from pymongo.collection import Collection
from bson.objectid import ObjectId

from app.schemas.prompt_schema import Prompt, PromptCreate
from helpers.prompt_parser import document_to_prompt

class PromptsRepository:
    COLLECTION_NAME = "prompts"

    def __init__(self, database):
        self.collection: Collection[Prompt] = database[self.COLLECTION_NAME]

    async def get(self, filters: dict) -> list[Prompt]:
        prompts = []
        prompts_response = await self.collection.find(filters).to_list()
        for document in prompts_response:
            prompt = document_to_prompt(document)
            prompts.append(prompt)
        return prompts

    async def get_by_id(self, id: str) -> Prompt:
        object_id = ObjectId(id)
        document = await self.collection.find_one({ "_id": object_id })
        return document_to_prompt(document)
    
    async def create(self, prompt_data: dict, user_id: str):
        prompt_data.update({
            "creation_date": datetime.now(),
            "user_id": ObjectId(user_id)
        })
        result = await self.collection.insert_one(prompt_data)
        return str(result.inserted_id)

    async def update(self, prompt_id: str, update_data: dict):
        return await self.collection.update_one({ "_id": ObjectId(prompt_id) }, { "$set": update_data  })
    
    async def delete(self, prompt_id: str):
        return await self.collection.delete_one({ "_id": ObjectId(prompt_id) })
 