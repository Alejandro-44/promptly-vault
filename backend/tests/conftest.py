from httpx import ASGITransport, AsyncClient

import pytest
from testcontainers.mongodb import MongoDbContainer
from pymongo import AsyncMongoClient

from app.services.services_manager import ServiceManager
from app.dependencies.database_deps import get_services
from app.main import app

@pytest.fixture
def mock_repo(mocker):
    return mocker.AsyncMock()


@pytest.fixture
def service_factory(mock_repo):
    def _factory(service_class):
        return service_class(mock_repo)
    return _factory


@pytest.fixture(scope="session")
def mongo_connection_url():
    with MongoDbContainer("mongodb/mongodb-community-server:8.0-ubi8") as mongo:
        yield mongo.get_connection_url()


@pytest.fixture()
async def db(mongo_connection_url):
    client = AsyncMongoClient(mongo_connection_url)
    db = client.get_database("test_db")
    yield db
    collections = await db.list_collection_names()
    for coll in collections:
        await db[coll].delete_many({})
    await client.close()


@pytest.fixture()
def services(db):
    return ServiceManager(db)


@pytest.fixture
async def e2e_client(db):
    service_manager = ServiceManager(db)
    app.state.database = db

    app.dependency_overrides.clear()
    app.dependency_overrides[get_services] = lambda: service_manager

    # Crear cliente HTTP de prueba
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        yield ac
