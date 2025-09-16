from .user_repository import UserRepository
from .prompts_repository import PromptsRepository

class RepositoryManager:
    def __init__(self, db):
        self.db = db
        self._user_repo = None
        self._propmpts_repo = None
    
    @property
    def users(self) -> UserRepository:
        if self._user_repo is None:
            self._user_repo = UserRepository(self.db)
        return self._user_repo
    
    @property
    def prompts(self) -> PromptsRepository:
        if self._propmpts_repo is None:
            self._propmpts_repo = PromptsRepository(self.db)
        return self._propmpts_repo