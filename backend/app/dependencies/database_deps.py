from typing import Annotated

from fastapi.params import Depends

from app.core.db import get_database
from app.repositories.repositories_manager import RepositoryManager


def get_repositories(db=Depends(get_database)) -> RepositoryManager:
    return RepositoryManager(db)

RepositoriesDependency = Annotated[RepositoryManager, Depends(get_repositories)]