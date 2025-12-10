from typing import List, Optional
from datetime import datetime

from pydantic import BaseModel

from .user_schema import User

class PromptBase(BaseModel):
    title: str
    prompt: str
    result_example: str
    model: str
    tags: List[str]


class PromptCreate(PromptBase):
    pass


class Prompt(PromptBase):
    id: str
    pub_date: datetime
    author: User

    @staticmethod
    def from_document(document):
        return Prompt(
            id=str(document["_id"]),
            title=document["title"],
            prompt=document["prompt"],
            result_example=document["result_example"],
            model=document["model"],
            tags=document.get("tags", []),
            pub_date=document["pub_date"],
            author=User.from_document(document["author"])
        )


class PromptUpdate(BaseModel):
    title: Optional[str] = None
    prompt: Optional[str] = None
    result_example: Optional[str] = None
    model: Optional[str] = None
    tags: Optional[List[str]] = None

class PromptSumary(BaseModel):
    id: str
    title: str
    tags: List[str]
    model: str
    pub_date: datetime
    author_name: str
    @staticmethod
    def from_document(document):
        return PromptSumary(
            id=str(document["_id"]),
            title=document["title"],
            tags=document.get("tags", []),
            model=document["model"],
            pub_date=document["pub_date"],
            author_name=document["author_name"]
        )
