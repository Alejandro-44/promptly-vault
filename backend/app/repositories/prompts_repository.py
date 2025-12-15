from pymongo.collection import Collection
from bson.objectid import ObjectId

from app.schemas.prompt_schema import Prompt

class PromptsRepository:

    def __init__(self, database):
        self.__collection: Collection[Prompt] = database["prompts"]

    async def get_summary(self, filters: dict | None = None) -> list[Prompt]:
        pipeline = []
        if filters:
            mongo_filters = {}

            if "user_id" in filters:
                mongo_filters["user_id"] = ObjectId(filters["user_id"])

            if "tags" in filters:
                mongo_filters["tags"] = { "$in": filters["tags"] }

            if "model" in filters:
                mongo_filters["model"] = filters["model"]

            pipeline.append({ "$match": mongo_filters })

        
        pipeline.extend([
            {
                "$lookup": {
                    "from": "users",
                    "localField": "user_id",
                    "foreignField": "_id",
                    "as": "author"
                }
            },
            { "$unwind": "$author" },
            {
                "$project": {
                    "_id": 1,
                    "title": 1,
                    "tags": 1,
                    "model": 1,
                    "pub_date": 1,
                    "author_id": "$author._id",
                    "author_name": "$author.username"
                }
            }
        ])

        cursor = await self.__collection.aggregate(pipeline)
        return await cursor.to_list()

    async def get_by_id(self, prompt_id: str) -> Prompt:
        pipeline = [
            {
                "$match": {
                    "_id": ObjectId(prompt_id)
                }
            },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "user_id",
                    "foreignField": "_id",
                    "as": "author"
                }
            },
            { "$unwind": "$author" },
        ]

        cursor = await self.__collection.aggregate(pipeline)
        return await cursor.to_list()

    async def create(self, prompt_data: dict) -> str:
        result = await self.__collection.insert_one(prompt_data)
        return str(result.inserted_id)

    async def update(self, prompt_id: str, user_id: str, update_data: dict) -> bool:
        result = await self.__collection.update_one({ "_id": ObjectId(prompt_id), "user_id": ObjectId(user_id) }, { "$set": update_data  })
        return result.modified_count > 0

    async def delete(self, prompt_id: str, user_id: str) -> bool:
        result = await self.__collection.delete_one({ "_id": ObjectId(prompt_id), "user_id": ObjectId(user_id) })
        return result.deleted_count > 0
 