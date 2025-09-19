from fastapi import APIRouter
from bson import ObjectId

from app.dependencies import UserDependency, RepositoriesDependency
from app.schemas.prompt_schema import Prompt
from app.schemas.user_schema import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=User)
async def get_me(current_user: UserDependency):
    """
    Get current logged in user
    """
    return current_user


@router.get("/me/prompts", response_model=list[Prompt], summary="Get my prompts")
async def get_my_prompts(current_user: UserDependency, repos: RepositoriesDependency):
    """
    Get prompts created by the current user
    """
    return await repos.prompts.get({"user_id": ObjectId(current_user.id)})

