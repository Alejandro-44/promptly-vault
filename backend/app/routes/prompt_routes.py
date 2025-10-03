from fastapi import APIRouter, status

from app.dependencies import ServicesDependency, UserDependency
from app.schemas.prompt_schema import Prompt, PromptCreate, PromptUpdate
from app.schemas.comment_schema import Comment, CommentCreate

router = APIRouter(prefix="/prompts", tags=["Prompts"])


@router.get("/", response_model=list[Prompt], status_code=status.HTTP_200_OK)
async def get_prompts(services: ServicesDependency):
    return await services.prompts.get_all();


@router.get("/{prompt_id}", response_model=Prompt, status_code=status.HTTP_200_OK)
async def get_prompt(prompt_id: str, services: ServicesDependency):
    return await services.prompts.get_by_id(prompt_id)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_prompt(prompt: PromptCreate, user: UserDependency, services: ServicesDependency):
    prompt_id = await services.prompts.create(prompt, user.id)
    return { "message": "New prompt created", "id": prompt_id}


@router.patch("/{prompt_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_prompt(
    prompt_id: str,
    prompt_update: PromptUpdate,
    user: UserDependency,
    services: ServicesDependency
    ):
    
    await services.prompts.update(user.id, prompt_id, prompt_update)


@router.delete("/{prompt_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_prompt(prompt_id: str, user: UserDependency, services: ServicesDependency):
    await services.prompts.delete(user.id, prompt_id)


@router.get("/{prompt_id}/comments", response_model=list[Comment], status_code=status.HTTP_200_OK)
async def get_comments(prompt_id: str, services: ServicesDependency):
    return await services.comments.get_prompt_comments(prompt_id)


@router.post("/{prompt_id}/comments", status_code=status.HTTP_201_CREATED)
async def create_comment(
    comment: CommentCreate,
    prompt_id: str,
    user: UserDependency,
    services: ServicesDependency
    ):
    comment_id = await services.comments.create(comment, prompt_id, user.id) 
    return { "message": "New comment created", "id": comment_id}


@router.delete("/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(comment_id: str, user: UserDependency, services: ServicesDependency):
    await services.comments.delete(comment_id, user.id)