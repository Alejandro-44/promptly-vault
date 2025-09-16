from datetime import datetime

from pymongo.collection import Collection
from bson.objectid import ObjectId

from app.schemas.comment_schema import Comment
from helpers.comment_parser import document_to_prompt

class CommentsRepository:
    COLLECTION_NAME = "comments"

    def __init__(self, database):
        self.collection: Collection[Comment] = database[self.COLLECTION_NAME]

    async def get_from(self, prompt_id: str) -> list[Comment]:
        object_id = ObjectId(prompt_id)
        comments_response = await self.collection.find({ "prompt_id": object_id }).to_list()
        comments = [document_to_prompt(document) for document in comments_response]
        return comments
    
    async def get_by_id(self, comment_id: str) -> Comment:
        object_id = ObjectId(comment_id)
        document = await self.collection.find_one({ "_id": object_id })
        return document_to_prompt(document)
    
    async def create(self, comment_data: dict, user_id: str, prompt_id: str):
        comment_data.update({
            "creation_date": datetime.now(),
            "user_id": ObjectId(user_id),
            "prompt_id": ObjectId(prompt_id)
        })
        result = await self.collection.insert_one(comment_data)
        return str(result.inserted_id)
    
    async def delete(self, comment_id: str):
        return await self.collection.delete_one({ "_id": ObjectId(comment_id) })
 