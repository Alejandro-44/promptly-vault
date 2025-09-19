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


class PromptUpdate(BaseModel):
    title: Optional[str] = None
    prompt: Optional[str] = None
    result_example: Optional[str] = None
    model: Optional[str] = None
    tags: Optional[List[str]] = None
