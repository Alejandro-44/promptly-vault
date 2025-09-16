from typing import List
from datetime import datetime

from fastapi import APIRouter, status, HTTPException
from bson.objectid import ObjectId

from app.api.dependencies import RepositoriesDependency, UserDependency
from app.schemas.prompt_schema import Prompt, PromptCreate, PromptUpdate

router = APIRouter(prefix="/prompts", tags=["Prompts"])

@router.get("/", response_model=List[Prompt], status_code=status.HTTP_200_OK)
async def get_prompts(repos: RepositoriesDependency):
    return await repos.prompts.get();

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_prompt(prompt: PromptCreate, user: UserDependency, repos: RepositoriesDependency):
    new_prompt = prompt.model_dump()

    try:
        await repos.prompts.create(new_prompt, user.id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Data base service unavailable",
        )

    return { "message": "New prompt created"}

@router.patch("/{prompt_id}")
async def update_prompt(
    prompt_id: str,
    prompt_update: PromptUpdate,
    user: UserDependency,
    repos: RepositoriesDependency
    ):
    prompt = await repos.prompts.get_by_id(prompt_id)
    prompt_user_id = str(prompt.get("user_id"))

    if (user.id != prompt_user_id):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No authorized to update")
    
    update_data = prompt_update.model_dump(exclude_unset=True)
    await repos.prompts.update(prompt_id, update_data)
    return { "Message": "Updated" }