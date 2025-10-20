import pytest
from bson import ObjectId

from app.repositories.prompts_repository import PromptsRepository

@pytest.mark.asyncio
async def test_prompt_lifecycle(db):
    repo = PromptsRepository(db)

    prompt_data = {
            "title": "Integration test",
            "prompt": "Write a poem",
            "result_example": "A small poem",
            "model": "gpt-4",
            "tags": ["ai", "poem"],
            "user_id": ObjectId(),
        }

    insert_result = await repo.create(prompt_data)
    inserted_id = insert_result.inserted_id
    assert inserted_id is not None

    # --- GET BY ID ---
    found_prompt = await repo.get_by_id(str(inserted_id))
    assert found_prompt["title"] == "Integration test"

    # --- UPDATE ---
    update_data = {"title": "Updated title"}
    update_result = await repo.update(str(inserted_id), update_data)
    assert update_result.modified_count == 1

    updated_prompt = await repo.get_by_id(str(inserted_id))
    assert updated_prompt["title"] == "Updated title"

    # --- GET ALL ---
    prompts = await repo.get()
    assert len(prompts) == 1
    assert prompts[0]["_id"] == inserted_id

    # --- DELETE ---
    delete_result = await repo.delete(str(inserted_id))
    assert delete_result.deleted_count == 1

    deleted_prompt = await repo.get_by_id(str(inserted_id))
    assert deleted_prompt is None