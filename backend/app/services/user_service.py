from typing import Optional
from fastapi import HTTPException
from bson import ObjectId

from app.schemas.user_schema import UserCreate, User
from app.core.security import hash_password
from app.repositories.user_repository import UserRepository

class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo
    
    async def get_by_email(self, email: str):
        return await self.repo.get_by_email(email)

    async def get_by_id(self, id: str):
        return await self.repo.get_by_id(id)

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
    
