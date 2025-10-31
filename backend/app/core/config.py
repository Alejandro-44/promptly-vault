from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Promptly Vault API"
    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB: str = "promptly"
    JWT_SECRET: str = "supersecret" 
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30


settings = Settings()

if __name__ == "__main__":
    print(settings.model_dump())