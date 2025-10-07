import pytest
from app.repositories.user_repository import UserRepository

@pytest.mark.asyncio
async def test_create_user_returns_id(mocker):
    # mock de la colección
    mock_collection = mocker.AsyncMock()
    mock_insert_result = mocker.Mock(inserted_id="abc123")
    mock_collection.insert_one.return_value = mock_insert_result

    mock_db = {"users": mock_collection}
    repo = UserRepository(mock_db)

    result = await repo.create({"email": "john@example.com"})

    mock_collection.insert_one.assert_awaited_once_with({"email": "john@example.com"})
    assert result == "abc123"


@pytest.mark.asyncio
async def test_get_by_email_returns_user(mocker):
    mock_collection = mocker.AsyncMock()
    mock_collection.find_one.return_value = {"email": "john@example.com"}

    mock_db = {"users": mock_collection}
    repo = UserRepository(mock_db)

    user = await repo.get_by_email("john@example.com")

    mock_collection.find_one.assert_awaited_once_with({"email": "john@example.com"})
    assert user["email"] == "john@example.com"
