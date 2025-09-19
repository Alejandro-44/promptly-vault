from app.repositories.user_repository import UserRepository
from app.repositories.prompts_repository import PromptsRepository
from .prompts_service import PromptsService
from .user_service import UserService
from .auth_service import AuthService

class ServiceManager:
    def __init__(self, db):
        self.db = db
        # User service
        self.__user_repo = UserRepository(self.db)
        self.__prompts_repo = PromptsRepository(self.db)
        self.__user_service = UserService(self.__user_repo)
        self.__auth_service = AuthService(self.__user_repo)
        self.__prompts_service = PromptsService(self.__prompts_repo)

    @property
    def user(self) -> UserService:
        return self.__user_service
    
    @property
    def auth(self) -> AuthService:
        return self.__auth_service
    
    @property
    def prompts(self) -> PromptsService:
        return self.__prompts_service