from typing import Annotated

from fastapi.params import Depends

from app.core.db import get_database
from app.repositories.repositories_manager import RepositoryManager
from app.services.services_manager import ServiceManager


def get_repositories(db=Depends(get_database)) -> RepositoryManager:
    return RepositoryManager(db)

def get_services(db=Depends(get_database)) -> ServiceManager:
    return ServiceManager(db)

RepositoriesDependency = Annotated[RepositoryManager, Depends(get_repositories)]
ServicesDependency = Annotated[ServiceManager, Depends(get_services)]
