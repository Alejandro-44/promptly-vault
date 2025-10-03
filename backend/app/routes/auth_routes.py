from fastapi import APIRouter, HTTPException, Depends, status, Response
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.user_schema import UserCreate, User, Token, UpdatePassword
from app.dependencies import UserDependency, ServicesDependency 
from app.core.exceptions import UserAlreadyExistsError, DatabaseError


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=User, summary="Create new user", status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, services: ServicesDependency):
    """
    Create a new user
    """
    try:
        return await services.user.register_user(user)
    except UserAlreadyExistsError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, message="Email aleady registered")
    except DatabaseError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, message="Failed to create user in service")



@router.post("/login", response_model=Token, summary="Login with form-data (OAuth2)")
async def login_oauth(
    response: Response,
    services: ServicesDependency,
    form_data: OAuth2PasswordRequestForm = Depends()
    ):
    """
    Login with OAuth2 a user and create a cookie with a JWT token
    """
    token = await services.auth.login(form_data.username, form_data.password)
    
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,      # Solo HTTPS en producción
        samesite="strict" # evita CSRF básico
    )

    return Token(access_token=token)


@router.post("/logout", summary="Logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(response: Response, current_user: UserDependency):
    """
    Logout a user by deleting the JWT cookie
    """
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=True,   
        samesite="strict"
    )
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/change-password", summary="Change password", status_code=status.HTTP_204_NO_CONTENT)
async def change_password(
    request: UpdatePassword,
    user: UserDependency,
    services: ServicesDependency
    ):
    """
    Change the password of the current user
    """
    updated = await services.auth.change_password(user.id, request.old_password, request.new_password)
    if not updated:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

