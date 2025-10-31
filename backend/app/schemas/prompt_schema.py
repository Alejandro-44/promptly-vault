from typing import List, Optional
from datetime import datetime

from pydantic import BaseModel, Field

class PromptBase(BaseModel):
    title: str
    prompt: str
    result_example: str
    model: str
    tags: List[str]


class PromptCreate(PromptBase):
    pass


class Prompt(PromptBase):
    id: Optional[str] = None
    user_id: str
    pub_date: datetime

    @staticmethod
    def from_document(document):
        return Prompt(
            id=str(document["_id"]),
            title=document["title"],
            prompt=document["prompt"],
            result_example=document["result_example"],
            model=document["model"],
            tags=document.get("tags", []),
            user_id=str(document["user_id"]),
            pub_date=document["pub_date"],
        )


class PromptUpdate(BaseModel):
    title: Optional[str] = None
    prompt: Optional[str] = None
    result_example: Optional[str] = None
    model: Optional[str] = None
    tags: Optional[List[str]] = None
