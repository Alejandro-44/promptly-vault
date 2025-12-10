import pytest
from bson import ObjectId

from app.repositories.prompts_repository import PromptsRepository

@pytest.mark.asyncio
async def test_prompt_lifecycle(db):
    repo = PromptsRepository(db)

    mock_user_id = ObjectId()

    prompt_mock = {
        "title": "Integration test",
        "prompt": "Write a poem",
        "result_example": "A small poem",
        "model": "gpt-4",
        "tags": ["ai", "poem"],
        "user_id": mock_user_id,
    }

    mock_user_id = str(mock_user_id)

    inserted_id = await repo.create(prompt_mock)
    assert isinstance(inserted_id, str)

    # --- GET BY ID ---
    found_prompt = await repo.get_by_id(inserted_id)
    assert found_prompt["title"] == "Integration test"

    # --- UPDATE ---
    update_data = { "title": "Updated title" }
    updated = await repo.update(inserted_id, mock_user_id, update_data)
    assert updated

    updated_prompt = await repo.get_by_id(inserted_id)
    assert updated_prompt["title"] == "Updated title"

    # --- GET ALL ---
    prompts = await repo.get_summary()
    assert len(prompts) == 1
    assert prompts[0]["_id"] == ObjectId(inserted_id)

    # --- DELETE ---
    deleted = await repo.delete(inserted_id, mock_user_id)
    assert deleted

    prompts = await repo.get()
    assert len(prompts) == 0
