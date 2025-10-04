from app.repositories.user_repository import UserRepository
from app.core.security import create_access_token, hash_password, verify_password
from app.core.exceptions import UnauthorizedError, EmailNotRegisteredError, WrongPasswordError, UserNotFoundError

class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def authenticate_user(self, email: str, password: str):
        user = await self.user_repo.get_by_email(email)
        if not user or not verify_password(password, user["hashed_password"]):
            raise UnauthorizedError()
        return user

    async def login(self, email: str, password: str) -> str:
        user =  await self.authenticate_user(email, password)
        if not user:
            raise EmailNotRegisteredError()

        return create_access_token({"sub": str(user['_id']), "email": user["email"]})
    
    async def change_password(self, user_id: str, old_password: str, new_password: str):
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise UserNotFoundError()
        
        if not verify_password(old_password, user["hashed_password"]):
            raise WrongPasswordError()
        
        new_hashed_password = hash_password(new_password)
        
        return await self.user_repo.update(user_id, { "hashed_password": new_hashed_password} )
        