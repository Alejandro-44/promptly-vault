from fastapi import HTTPException, status

from app.schemas.user_schema import UserCreate, User
from app.core.security import hash_password
from app.repositories.user_repository import UserRepository

class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo
    
    async def get_by_email(self, email: str):
        return await self.repo.get_by_email(email)

    async def get_by_id(self, user_id: str):
        user_db = await self.repo.get_by_id(user_id)
        if not user_db:
            HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        if not user_db["is_active"]:
            return User(
                id=str(user_db["_id"]),
                username="deleted user",
                email="deleted@deleted.com",
                is_active=False
            )

        return User(
            id=str(user_db["_id"]),
            username=user_db["username"],
            email=user_db["email"],
            is_active=user_db["is_active"]
        )

    async def register_user(self, user_in: UserCreate) -> User | HTTPException:
        existing = await self.get_by_email(user_in.email)
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")

        new_user = {
            "username": user_in.username,
            "email": user_in.email,
            "hashed_password": hash_password(user_in.password),
            "is_active": True,
        }

        await self.repo.create(new_user)

        return User(
            id=str(new_user["_id"]),
            username=new_user["username"],
            email=new_user["email"],
            is_active=new_user["is_active"]
        )
    
    async def deactivate(self, user_id: str) -> bool:
        result = await self.repo.update(user_id, { "is_active": False })
        if not result:
            HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong on db"
            )
        return result