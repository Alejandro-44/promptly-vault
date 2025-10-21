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

class CommentUpdate(BaseModel):
    content: Optional[str] = None
    user_id: Optional[str] = None
    prompt_id: Optional[str] = None
    pub_date: Optional[datetime] = None
