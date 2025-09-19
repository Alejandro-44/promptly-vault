from app.repositories.user_repository import UserRepository
from .user_service import UserService

class ServiceManager:
    def __init__(self, db):
        self.db = db
        # User service
        self.__user_repo = UserRepository(self.db)
        self.__user_service = UserService(self.__user_repo)

    @property
    def user(self) -> UserService:
        return self.__user_service
    