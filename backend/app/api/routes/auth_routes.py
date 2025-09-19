from fastapi import APIRouter, HTTPException, Depends, status, Response
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.user_schema import UserCreate, User, Token, UpdatePassword
from app.core.security import hash_password, verify_password, create_access_token
from app.api.dependencies import UserDependency, RepositoriesDependency

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=User, summary="Create new user", status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, repos: RepositoriesDependency):
    """
    Create a new user

    It expects a JSON with:
    - username: str
    - email: str
    - password: str

    """
    existing = await repos.users.get_user_by_email(user.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hash_password(user.password),
        "is_active": True,
    }

    await repos.users.create_user(new_user)


@router.post("/login", response_model=Token, summary="Login with form-data (OAuth2)")
async def login_oauth(
    response: Response,
    repos: RepositoriesDependency,
    form_data: OAuth2PasswordRequestForm = Depends()
    ):
    """
    Login with OAuth2 a user and create a cookie with a JWT token
    """
    db_user = await repos.users.get_user_by_email(form_data.username)

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email no registrado",
        )

    if not verify_password(form_data.password, db_user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas",
        )

    token = create_access_token({"sub": str(db_user["_id"])})
    
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,      # Solo HTTPS en producción
        samesite="strict" # evita CSRF básico
    )

    token = create_access_token({"sub": str(db_user["_id"])})
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
    repos: RepositoriesDependency
    ):
    """
    Change the password of the current user
    """
    db_user = await repos.users.get_user(user.id)
    if not verify_password(request.old_password, db_user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="password is incorrect",
        )
    
    new_hashed_password = hash_password(request.new_password)

    await repos.users.update_user(user.id, {"hashed_password": new_hashed_password})
