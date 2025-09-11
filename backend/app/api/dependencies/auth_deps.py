from typing import Annotated

from fastapi import HTTPException, Request, status
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordBearer

from app.api.dependencies import RepositoriesDependency
from app.core.security import decode_access_token
from app.schemas.user_schema import UserOut


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
OAuth2Dependency = Annotated[str, Depends(oauth2_scheme)]

async def get_current_user(
    request: Request,
    repos: RepositoriesDependency,
    token: OAuth2Dependency
):
    # Si no hay header Authorization, buscamos en cookies
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

    user = await repos.users.get_user(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado",
        )

    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuario inactivo",
        )
    
    return UserOut(
        id=str(user["_id"]),
        email=user["email"],
        username=user["username"],
        is_active=user.get("is_active", True),
    )


UserDependency = Annotated[UserOut, Depends(get_current_user)]