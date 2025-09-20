from typing import Annotated

from fastapi.params import Depends

from app.core.db import get_database
from app.services.services_manager import ServiceManager

def get_services(db=Depends(get_database)) -> ServiceManager:
    return ServiceManager(db)

ServicesDependency = Annotated[ServiceManager, Depends(get_services)]
