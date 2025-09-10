from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    username: str
    email: EmailStr
    is_active: bool


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"