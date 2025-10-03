from app.schemas.user_schema import UserCreate, User
from app.core.security import hash_password
from app.repositories.user_repository import UserRepository
from app.core.exceptions import UserNotFoundError, UserAlreadyExistsError, DatabaseError

class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo
    
    async def get_by_email(self, email: str):
        return await self.user_repo.get_by_email(email)

    async def get_by_id(self, user_id: str):
        user_db = await self.user_repo.get_by_id(user_id)
        if not user_db:
            raise UserNotFoundError()

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

    async def register_user(self, user_in: UserCreate) -> User | Exception:
        existing = await self.get_by_email(user_in.email)
        if existing:
            raise UserAlreadyExistsError()

        new_user = {
            "username": user_in.username,
            "email": user_in.email,
            "hashed_password": hash_password(user_in.password),
            "is_active": True,
        }

        new_user_id = await self.user_repo.create(new_user)
        if not new_user_id:
            raise DatabaseError("Failed to create user")

        return User(
            id=new_user_id,
            username=new_user["username"],
            email=new_user["email"],
            is_active=new_user["is_active"]
        )
    
    async def deactivate(self, user_id: str) -> bool:
        result = await self.user_repo.update(user_id, { "is_active": False })
        if not result:
            raise DatabaseError("Failed to deactivate user")
        return result