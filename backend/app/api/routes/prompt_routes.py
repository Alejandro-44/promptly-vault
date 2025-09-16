from fastapi import APIRouter, status, HTTPException

from app.api.dependencies import RepositoriesDependency, UserDependency
from app.schemas.prompt_schema import Prompt, PromptCreate, PromptUpdate
from app.schemas.comment_schema import Comment, CommentCreate

router = APIRouter(prefix="/prompts", tags=["Prompts"])


@router.get("/", response_model=list[Prompt], status_code=status.HTTP_200_OK)
async def get_prompts(repos: RepositoriesDependency):
    return await repos.prompts.get();


@router.get("/{prompt_id}", response_model=Prompt, status_code=status.HTTP_200_OK)
async def get_prompt(prompt_id: str, repos: RepositoriesDependency):
    prompt = await repos.prompts.get_by_id(prompt_id)

    if not prompt:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Prompt not found")
    
    return prompt


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


@router.patch("/{prompt_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_prompt(
    prompt_id: str,
    prompt_update: PromptUpdate,
    user: UserDependency,
    repos: RepositoriesDependency
    ):
    prompt = await repos.prompts.get_by_id(prompt_id)

    if user.id != prompt.user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No authorized to update")
    
    update_data = prompt_update.model_dump(exclude_unset=True)
    await repos.prompts.update(prompt_id, update_data)


@router.delete("/{prompt_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_prompt(prompt_id: str, user: UserDependency, repos: RepositoriesDependency):
    prompt = await repos.prompts.get_by_id(prompt_id)

    if user.id != prompt.user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No authorized to delete")
    
    await repos.prompts.delete(prompt_id)


@router.get("/{prompt_id}/comments", response_model=list[Comment], status_code=status.HTTP_200_OK)
async def get_comments(prompt_id: str, repos: RepositoriesDependency):
    return await repos.comments.get_from(prompt_id)


@router.post("/{prompt_id}/comments", status_code=status.HTTP_201_CREATED)
async def create_comment(
    prompt_id: str,
    comment: CommentCreate,
    user: UserDependency,
    repos: RepositoriesDependency
    ):
    new_comment = comment.model_dump()

    try:
        await repos.comments.create(new_comment, user.id, prompt_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Data base service unavailable",
        )

    return { "message": "New comment created"}


@router.delete("/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(comment_id: str, user: UserDependency, repos: RepositoriesDependency):
    comment = await repos.comments.get_by_id(comment_id)

    if user.id != comment.user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No authorized to delete")
    
    await repos.comments.delete(comment_id)