from pymongo.collection import Collection
from bson.objectid import ObjectId

from app.schemas.comment_schema import Comment

class CommentsRepository:

    def __init__(self, database):
        self.collection: Collection[Comment] = database["comments"]

    async def get_by_prompt(self, prompt_id: str):
        return await self.collection.find({ "prompt_id": ObjectId(prompt_id) }).to_list()
    
    async def create(self, comment_data: dict):
        return await self.collection.insert_one(comment_data)
    
    async def update(self, comment_id: str, user_id: str, comment_data: dict):
        result = await self.collection.update_one({ "_id": ObjectId(comment_id), "user_id": ObjectId(user_id) }, comment_data) 
        return result.modified_count > 0
    
    async def delete(self, comment_id: str, user_id: str):
        result = await self.collection.delete_one({ "_id": ObjectId(comment_id), "user_id": ObjectId(user_id) })
        return result.deleted_count > 0
 