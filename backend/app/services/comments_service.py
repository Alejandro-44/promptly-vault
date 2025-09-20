from datetime import datetime

from bson import ObjectId
from fastapi import HTTPException, status

from app.schemas.comment_schema import CommentCreate
from app.repositories.comments_repository import CommentsRepository
from app.helpers.comment_parser import document_to_comment

class CommentsService:

    def __init__(self, comments_repo: CommentsRepository):
        self.comments_repo = comments_repo

    def process_comment_documents(self, comment_documents):
        return [document_to_comment(comment) for comment in comment_documents]

    async def get_prompt_comments(self, prompt_id: str):
        comment_documents = await self.comments_repo.get_from(prompt_id)
        return self.process_comment_documents(comment_documents)

    async def create(self, comment_in: CommentCreate, prompt_id: str, user_id: str):
        comment_data = comment_in.model_dump()
        comment_data.update({
            "pub_date": datetime.now(),
            "prompt_id": ObjectId(prompt_id),
            "user_id": ObjectId(user_id)
        })

        result = await self.comments_repo.create(comment_data)

        return str(result.inserted_id)
    
    async def delete(self, comment_id, user_id):
        comment_document = await self.comments_repo.get_one_by_user(comment_id, user_id)
        if not comment_document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Comment not found"
            )
        
        await self.comments_repo.delete(comment_id)
    

