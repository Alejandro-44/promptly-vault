from fastapi import APIRouter
from app.api.dependencies import UserDependency

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me")
async def get_me(current_user: UserDependency):
    return {"user": current_user}
