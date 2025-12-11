import pytest
from bson import ObjectId

from app.repositories.prompts_repository import PromptsRepository

@pytest.mark.asyncio
async def test_prompt_lifecycle(db):
    prompts_repo = PromptsRepository(db)

    mock_user_id = ObjectId()
    
    await db.users.insert_one({
        "_id": mock_user_id,
        "username": "testuser",
        "email": "testuser@example.com"
    })

    prompt_mock = {
        "title": "Integration test",
        "prompt": "Write a poem",
        "result_example": "A small poem",
        "model": "gpt-4",
        "tags": ["ai", "poem"],
        "user_id": mock_user_id,
    }

    inserted_id = await prompts_repo.create(prompt_mock)
    assert isinstance(inserted_id, str)

    # --- GET BY ID ---
    found_prompt = await prompts_repo.get_by_id(inserted_id)
    assert len(found_prompt) == 1
    assert found_prompt[0]["title"] == "Integration test"

    # --- UPDATE ---
    update_data = { "title": "Updated title" }
    updated = await prompts_repo.update(inserted_id, mock_user_id, update_data)
    assert updated

    updated_prompt = await prompts_repo.get_by_id(inserted_id)
    assert updated_prompt[0]["title"] == "Updated title"

    # --- GET ALL ---
    prompts = await prompts_repo.get_summary()
    assert len(prompts) == 1
    assert prompts[0]["_id"] == ObjectId(inserted_id)

    # --- DELETE ---
    deleted = await prompts_repo.delete(inserted_id, mock_user_id)
    assert deleted

    prompts = await prompts_repo.get_summary()
    assert len(prompts) == 0
