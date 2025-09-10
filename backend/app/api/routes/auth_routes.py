from fastapi import APIRouter, HTTPException, Depends, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from bson import ObjectId

from app.core.db import users_collection
from app.schemas.user_schema import UserCreate, UserLogin, UserOut, Token
from app.core.security import hash_password, verify_password, create_access_token
from app.api.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email ya registrado")

    new_user = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hash_password(user.password),
        "is_active": True,
    }
    result = await users_collection.insert_one(new_user)

    return UserOut(
        id=str(result.inserted_id),
        username=user.username,
        email=user.email,
        is_active=True,
    )


# --- Login con form-data (OAuth2 estándar) ---
@router.post("/login", response_model=Token, summary="Login con form-data (OAuth2)")
async def login_oauth(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    # Aquí OAuth2PasswordRequestForm entrega "username"
    db_user = await users_collection.find_one({"email": form_data.username})
    if not db_user or not verify_password(form_data.password, db_user["hashed_password"]):
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

@router.post("/logout", summary="Cerrar sesión", status_code=status.HTTP_204_NO_CONTENT)
async def logout(response: Response, current_user=Depends(get_current_user)):
    """
    Invalida la sesión borrando la cookie access_token.
    """
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=True,   
        samesite="strict"
    )
    return Response(status_code=status.HTTP_204_NO_CONTENT)