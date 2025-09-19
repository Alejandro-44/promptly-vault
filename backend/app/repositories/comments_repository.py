from datetime import datetime

from pymongo.collection import Collection
from bson.objectid import ObjectId

from app.schemas.comment_schema import Comment

class CommentsRepository:

    def __init__(self, database):
        self.collection: Collection[Comment] = database["comments"]

    async def get_from(self, prompt_id: str):
        return await self.collection.find({ "prompt_id": ObjectId(prompt_id) }).to_list()
    
    async def get_by_id(self, comment_id: str):
        return self.collection.find_one({ "_id": ObjectId(comment_id) })
    
    async def create(self, comment_data: dict):
        return await self.collection.insert_one(comment_data)
    
    async def delete(self, comment_id: str):
        return await self.collection.delete_one({ "_id": ObjectId(comment_id) })
 