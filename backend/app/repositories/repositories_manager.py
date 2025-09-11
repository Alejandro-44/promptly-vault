from app.repositories.user_repository import UserRepository


class RepositoryManager:
    def __init__(self, db):
        self.db = db
        self._user_repo = None
        self._product_repo = None
        self._order_repo = None
    
    @property
    def users(self) -> UserRepository:
        if self._user_repo is None:
            self._user_repo = UserRepository(self.db)
        return self._user_repo