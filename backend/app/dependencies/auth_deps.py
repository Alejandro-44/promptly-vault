from typing import Annotated

from fastapi import HTTPException, Request, status
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordBearer

from app.dependencies import ServicesDependency
from app.core.security import decode_access_token
from app.schemas.user_schema import User
from app.core.exceptions import UserNotFoundError


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
OAuth2Dependency = Annotated[str, Depends(oauth2_scheme)]

async def get_current_user(
    request: Request,
    services: ServicesDependency,
    token: OAuth2Dependency
):
    if not token:
        token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token no encontrado",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_access_token(token)
    user_id: str = payload.get("sub")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        user = await services.user.get_by_id(user_id)
    except UserNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Inactive user",
        )
    
    return user


UserDependency = Annotated[User, Depends(get_current_user)]