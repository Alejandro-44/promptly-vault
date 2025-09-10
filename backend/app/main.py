from fastapi import FastAPI
from app.api.routes import auth_routes, user_routes
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(auth_routes.router)
app.include_router(user_routes.router)