from datetime import datetime

from bson import ObjectId
from bson.errors import InvalidId

from app.schemas.comment_schema import CommentCreate, CommentUpdate, Comment
from app.repositories.comments_repository import CommentsRepository
from app.core.exceptions import CommentNotFoundError, PromptNotFoundError

class CommentsService:
    
    def __init__(self, comments_repo: CommentsRepository):
        self.__comments_repo = comments_repo

    async def get_prompt_comments(self, prompt_id: str) -> list[Comment]:
        comment_documents = None
        try:
            comment_documents = await self.__comments_repo.get_by_prompt(prompt_id)
        except InvalidId:
            raise PromptNotFoundError()
        return [Comment.from_document(document) for document in comment_documents]

    async def create(self, prompt_id: str, user_id: str, comment_in: CommentCreate) -> str:
        comment_data = comment_in.model_dump()
        comment_data.update({
            "pub_date": datetime.now(),
            "prompt_id": ObjectId(prompt_id),
            "user_id": ObjectId(user_id)
        })
        comment_id = await self.__comments_repo.create(comment_data)
        return comment_id

    async def update(self, comment_id: str, user_id: str, update_data: CommentUpdate) -> bool:
        new_data = update_data.model_dump(exclude_unset=True)
        updated = await self.__comments_repo.update(comment_id, user_id, new_data)
        if not updated:
            raise CommentNotFoundError()
        return updated

    async def delete(self, comment_id, user_id) -> bool:
        deleted = await self.__comments_repo.delete(comment_id, user_id)
        if not deleted:
            raise CommentNotFoundError()
        return deleted
