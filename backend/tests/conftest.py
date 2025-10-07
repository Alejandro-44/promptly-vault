# conftest.py
import pytest
from testcontainers.mongodb import MongoDbContainer
from pymongo import AsyncMongoClient

@pytest.fixture(scope="session")
def mongo_connection_url():
    with MongoDbContainer("mongodb/mongodb-community-server:8.0-ubi8") as mongo:
        yield mongo.get_connection_url()

@pytest.fixture
async def mongo_client(mongo_connection_url):
    client = AsyncMongoClient(mongo_connection_url)
    yield client
    await client.close()