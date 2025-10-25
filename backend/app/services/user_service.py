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
        user_doc = await self.user_repo.get_by_id(user_id)
        if not user_doc:
            raise UserNotFoundError()

        if not user_doc["is_active"]:
            return User(
                id=str(user_doc["_id"]),
                username="deleted user",
                email="deleted@deleted.com",
                is_active=False
            )

        return User.from_document(user_doc)

    async def register_user(self, user_in: UserCreate) -> User | Exception:
        try:
            existing = await self.get_by_email(user_in.email)
        except:
            pass

        if existing:
            raise UserAlreadyExistsError()

        new_user = {
            "username": user_in.username,
            "email": user_in.email,
            "hashed_password": hash_password(user_in.password),
            "is_active": True,
        }

        try:
            new_user_id = await self.user_repo.create(new_user)
        except:
            raise DatabaseError()

        return User(
            id=new_user_id,
            username=new_user["username"],
            email=new_user["email"],
            is_active=new_user["is_active"]
        )
    
    async def deactivate(self, user_id: str) -> bool:
        deactivated = await self.user_repo.update(user_id, { "is_active": False })
        if not deactivated:
            raise DatabaseError("Failed to deactivate user")
        return deactivated
