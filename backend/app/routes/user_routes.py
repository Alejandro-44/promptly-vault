from fastapi import APIRouter, status

from app.dependencies import UserDependency, ServicesDependency
from app.schemas.prompt_schema import PromptSummary
from app.schemas.user_schema import User


router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=User)
async def get_me(current_user: UserDependency):
    """
    Get current logged in user
    """
    return current_user


@router.get("/me/prompts", response_model=list[PromptSummary], summary="Get my prompts")
async def get_my_prompts(current_user: UserDependency, service: ServicesDependency):
    """
    Get prompts created by the current user
    """
    return await service.prompts.get_by_user(current_user.id)


@router.get("/{user_id}")
async def get_user(user_id: str, service: ServicesDependency):
    return await service.user.get_by_id(user_id)


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_me(user: UserDependency, service: ServicesDependency):
    await service.user.deactivate(user.id)
