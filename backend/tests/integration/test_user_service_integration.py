import pytest

from app.schemas.user_schema import UserCreate
from app.core.exceptions import UserAlreadyExistsError
from app.core.exceptions import UserNotFoundError

@pytest.mark.asyncio
async def test_register_and_get_user(user_service):
    user_in = UserCreate(username="Alice", email="alice@example.com", password="1234")

    user = await user_service.register_user(user_in)
    assert user.email == "alice@example.com"

    # Recuperar desde MongoDB real
    found = await user_service.get_by_id(user.id)
    assert found.username == "Alice"
    assert found.is_active


@pytest.mark.asyncio
async def test_register_duplicate_user_raises_error(user_service):
    user_in = UserCreate(username="Bob", email="bob@example.com", password="abcd")

    # Crear el primero
    await user_service.register_user(user_in)

    # Intentar duplicar
    with pytest.raises(UserAlreadyExistsError):
        await user_service.register_user(user_in)


@pytest.mark.asyncio
async def test_deactivate_user_changes_status(user_service):
    user_in = UserCreate(username="Eve", email="eve@example.com", password="xyz")
    user = await user_service.register_user(user_in)

    # Desactivar usuario
    result = await user_service.deactivate(user.id)
    assert result is True

    # Consultar nuevamente
    found = await user_service.get_by_id(user.id)
    assert found.username == "deleted user"
    assert not found.is_active


@pytest.mark.asyncio
async def test_get_nonexistent_user_raises(user_service):
    with pytest.raises(UserNotFoundError):
        await user_service.get_by_id("66fda4b20f00000000000000")
