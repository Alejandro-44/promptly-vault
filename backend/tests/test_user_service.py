import pytest
from app.services.user_service import UserService
from app.core.exceptions import UserNotFoundError, UserAlreadyExistsError, DatabaseError
from app.schemas.user_schema import UserCreate

@pytest.mark.asyncio
async def test_get_by_id_returns_user(mocker):
    # Mock del repositorio
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_id.return_value = {
        "_id": "123",
        "username": "John",
        "email": "john@example.com",
        "is_active": True
    }

    service = UserService(mock_repo)
    user = await service.get_by_id("123")

    assert user.username == "John"
    assert user.email == "john@example.com"
    mock_repo.get_by_id.assert_awaited_once_with("123")


@pytest.mark.asyncio
async def test_get_by_id_raises_not_found(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_id.return_value = None

    service = UserService(mock_repo)

    with pytest.raises(UserNotFoundError):
        await service.get_by_id("123")


@pytest.mark.asyncio
async def test_get_by_id_returns_deleted_user(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_id.return_value = {
        "_id": "123",
        "is_active": False,
    }

    service = UserService(mock_repo)
    user = await service.get_by_id("123")

    assert user.username == "deleted user"
    assert user.email == "deleted@deleted.com"
    assert not user.is_active


@pytest.mark.asyncio
async def test_register_user_success(mocker):
    # mock del repositorio
    mock_repo = mocker.AsyncMock()
    mock_repo.create.return_value = "abc123"
    mock_repo.get_by_email.return_value = None

    # mock de hash_password
    mocker.patch("app.services.user_service.hash_password", return_value="hashed_pw")

    user_in = UserCreate(username="Alice", email="alice@example.com", password="1234")

    service = UserService(mock_repo)
    user = await service.register_user(user_in)

    assert user.username == "Alice"
    assert user.email == "alice@example.com"
    assert user.id == "abc123"
    mock_repo.create.assert_awaited_once()
    mock_repo.get_by_email.assert_awaited_once_with("alice@example.com")


@pytest.mark.asyncio
async def test_register_user_raises_already_exists(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_email.return_value = {"email": "exists@example.com"}

    user_in = UserCreate(username="John", email="exists@example.com", password="pass")

    service = UserService(mock_repo)

    with pytest.raises(UserAlreadyExistsError):
        await service.register_user(user_in)


@pytest.mark.asyncio
async def test_register_user_raises_database_error(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_email.return_value = None
    mock_repo.create.return_value = None  # simulate DB failure

    mocker.patch("app.services.user_service.hash_password", return_value="hashed_pw")

    user_in = UserCreate(username="Fail", email="fail@example.com", password="x")

    service = UserService(mock_repo)

    with pytest.raises(DatabaseError):
        await service.register_user(user_in)


@pytest.mark.asyncio
async def test_deactivate_user_success(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.update.return_value = True

    service = UserService(mock_repo)

    result = await service.deactivate("123")

    assert result is True
    mock_repo.update.assert_awaited_once_with("123", {"is_active": False})


@pytest.mark.asyncio
async def test_deactivate_user_fails(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.update.return_value = False

    service = UserService(mock_repo)

    with pytest.raises(DatabaseError):
        await service.deactivate("123")
