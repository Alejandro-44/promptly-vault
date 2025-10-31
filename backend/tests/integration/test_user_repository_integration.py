import pytest

from app.repositories.user_repository import UserRepository

@pytest.mark.asyncio
async def test_user_lifecycle(db):
    repo = UserRepository(db)

    user_data = { "username": "John", "email": "john@example.com", "is_active": True }

    # --- CREATE ---
    user_id = await repo.create(user_data)
    assert isinstance(user_id, str)

    # --- GET BY EMAIL ---
    found = await repo.get_by_email("john@example.com")
    assert found["username"] == "John"

    # --- UPDATE ---
    updated = await repo.update(user_id, {"is_active": False})
    assert updated is True

    # --- GET BY ID ---
    found = await repo.get_by_id(user_id)
    assert found["is_active"] is False
