from datetime import datetime

from bson import ObjectId

from app.schemas.comment_schema import CommentCreate, CommentUpdate, Comment
from app.repositories.comments_repository import CommentsRepository
from app.core.exceptions import CommentNotFoundError

class CommentsService:
    def __init__(self, comments_repo: CommentsRepository):
        self.comments_repo = comments_repo

    async def get_prompt_comments(self, prompt_id: str):
        comment_documents = await self.comments_repo.get_by_prompt(prompt_id)
        return [Comment.from_document(document) for document in comment_documents]

    async def create(self, comment_in: CommentCreate, prompt_id: str, user_id: str):
        comment_data = comment_in.model_dump()
        comment_data.update({
            "pub_date": datetime.now(),
            "prompt_id": ObjectId(prompt_id),
            "user_id": ObjectId(user_id)
        })
        result = await self.comments_repo.create(comment_data)
        return str(result.inserted_id)
    
    async def update(self, comment_id: str, user_id: str, update_data: CommentUpdate) -> bool:
        updated = await self.comments_repo.update(comment_id, user_id, update_data)
        if not updated:
            raise CommentNotFoundError()
        return updated
    
    async def delete(self, comment_id, user_id) -> bool:
        deleted = await self.comments_repo.delete(comment_id, user_id)
        if not deleted:
            raise CommentNotFoundError()
        return deleted
    
