from fastapi import HTTPException
from app.schemas.user_schema import UserCreate, User
from app.core.security import hash_password
from app.repositories.user_repository import UserRepository

class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def register_user(self, user_in: UserCreate) -> User:
        existing = await self.repo.get_user_by_email(user_in.email)
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")

        new_user = {
            "username": user_in.username,
            "email": user_in.email,
            "hashed_password": hash_password(user_in.password),
            "is_active": True,
        }

        created = await self.repo.create_user(new_user)

        return User(
            id=created["_id"],
            username=created["username"],
            email=created["email"],
            is_active=created["is_active"]
        )
    
    

