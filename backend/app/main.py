from contextlib import asynccontextmanager

from fastapi import FastAPI
from pymongo import AsyncMongoClient

from app.api.routes import auth_routes, user_routes
from app.core.config import settings
from app.core import db

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        # Definir conexion a la base de datos:
        client = AsyncMongoClient(settings.MONGO_URI)
        database = client.get_database(settings.MONGO_DB)

        # Guardar en app.state
        app.state.client = client
        app.state.database = database

        # Asegurarse que la app puede conectarse a la base de datos
        pong = await database.command("ping")
        if int(pong["ok"]) != 1:
            raise Exception("Cluster connection is not okay!")
        # Regresar a la ejecucion de la app
        yield

        # Cerrar conexion
        await client.close()
    except Exception as e:
        print("Error connecting to the database:", e)
        raise e


app = FastAPI(lifespan=lifespan, title=settings.PROJECT_NAME)

app.include_router(auth_routes.router)
app.include_router(user_routes.router)