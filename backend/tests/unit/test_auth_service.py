import pytest
from app.services.auth_service import AuthService
from app.core.exceptions import (
    UnauthorizedError,
    WrongPasswordError,
    UserNotFoundError,
)


@pytest.mark.asyncio
async def test_authenticate_user_success(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_email.return_value = {"hashed_password": "hashed123"}

    mocker.patch("app.services.auth_service.verify_password", return_value=True)

    service = AuthService(mock_repo)
    user = await service.authenticate_user("test@example.com", "1234")

    assert user == {"hashed_password": "hashed123"}
    mock_repo.get_by_email.assert_awaited_once_with("test@example.com")


@pytest.mark.asyncio
async def test_authenticate_user_fails_invalid_password(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_email.return_value = {"hashed_password": "hashed123"}

    mocker.patch("app.services.auth_service.verify_password", return_value=False)

    service = AuthService(mock_repo)

    with pytest.raises(UnauthorizedError):
        await service.authenticate_user("test@example.com", "wrongpass")


@pytest.mark.asyncio
async def test_authenticate_user_fails_user_not_found(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_email.return_value = None

    mocker.patch("app.services.auth_service.verify_password", return_value=True)

    service = AuthService(mock_repo)

    with pytest.raises(UnauthorizedError):
        await service.authenticate_user("test@example.com", "1234")


@pytest.mark.asyncio
async def test_login_success(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_email.return_value = {"_id": "123", "email": "john@example.com", "hashed_password": "hashed"}

    mocker.patch("app.services.auth_service.verify_password", return_value=True)
    mocker.patch("app.services.auth_service.create_access_token", return_value="jwt.token.here")

    service = AuthService(mock_repo)

    token = await service.login("john@example.com", "1234")

    assert token == "jwt.token.here"
    mock_repo.get_by_email.assert_awaited_once_with("john@example.com")


@pytest.mark.asyncio
async def test_login_invalid_password_raises_error(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_email.return_value = {"_id": "123", "email": "john@example.com", "hashed_password": "hashed"}

    mocker.patch("app.services.auth_service.verify_password", return_value=False)

    service = AuthService(mock_repo)

    with pytest.raises(UnauthorizedError):
        await service.login("john@example.com", "wrongpass")


@pytest.mark.asyncio
async def test_change_password_success(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_id.return_value = {"_id": "123", "hashed_password": "old_hashed"}

    mocker.patch("app.services.auth_service.verify_password", return_value=True)
    mocker.patch("app.services.auth_service.hash_password", return_value="new_hashed")

    mock_repo.update.return_value = True

    service = AuthService(mock_repo)
    result = await service.change_password("123", "old_pass", "new_pass")

    assert result is True
    mock_repo.update.assert_awaited_once_with("123", {"hashed_password": "new_hashed"})


@pytest.mark.asyncio
async def test_change_password_user_not_found(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_id.return_value = None

    service = AuthService(mock_repo)

    with pytest.raises(UserNotFoundError):
        await service.change_password("123", "old", "new")


@pytest.mark.asyncio
async def test_change_password_wrong_password(mocker):
    mock_repo = mocker.AsyncMock()
    mock_repo.get_by_id.return_value = {"_id": "123", "hashed_password": "old_hashed"}

    mocker.patch("app.services.auth_service.verify_password", return_value=False)

    service = AuthService(mock_repo)

    with pytest.raises(WrongPasswordError):
        await service.change_password("123", "wrong_pass", "new_pass")
