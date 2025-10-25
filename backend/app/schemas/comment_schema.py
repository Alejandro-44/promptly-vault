from datetime import datetime
from typing import Optional

from pydantic import BaseModel

class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: str
    user_id: str
    prompt_id: str
    pub_date: datetime

    @staticmethod
    def from_document(document):
        return Comment(
            id=str(document["_id"]),
            content=document["content"],
            prompt_id=str(document["prompt_id"]),
            user_id=str(document["user_id"]),
            pub_date=document["pub_date"],
        )

class CommentUpdate(BaseModel):
    content: Optional[str] = None
    user_id: Optional[str] = None
    prompt_id: Optional[str] = None
    pub_date: Optional[datetime] = None
