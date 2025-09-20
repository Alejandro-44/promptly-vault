from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')
    PROJECT_NAME: str = "Promptly Vault API"
    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB: str = "promptly"

    JWT_SECRET: str = "supersecret" 
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30


settings = Settings()

if __name__ == "__main__":
    print(settings.model_dump())