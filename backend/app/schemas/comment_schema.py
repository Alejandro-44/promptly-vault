from datetime import datetime

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

