import pytest
from bson import ObjectId
from app.schemas.prompt_schema import PromptCreate, PromptUpdate
from app.core.exceptions import PromptNotFoundError, DatabaseError


@pytest.mark.asyncio
async def test_create_prompt_success(services):
    prompt_in = PromptCreate(
        title="Prompt de prueba",
        prompt="Test prompt",
        result_example="general",
        model="ChatGPT",
        tags=["ai", "nlp"],
    )

    user_id = str(ObjectId())
    prompt_id = await services.prompts.create(prompt_in, user_id)

    assert isinstance(prompt_id, str)
    prompt = await services.prompts.get_by_id(prompt_id)

    assert prompt.title == "Prompt de prueba"
    assert prompt.user_id == user_id
    assert prompt.model == "ChatGPT"


@pytest.mark.asyncio
async def test_get_by_user_returns_only_user_prompts(services):

    user_a = str(ObjectId())
    user_b = str(ObjectId())

    prompt_a = PromptCreate(
        title="Prompt A",
        prompt="Test prompt",
        result_example="test",
        model="ChatGPT",
        tags=["ai"],
    )
    prompt_b = PromptCreate(
        title="Prompt B",
        prompt="Test prompt",
        result_example="test",
        model="ChatGPT",
        tags=["ai"],
    )

    await services.prompts.create(prompt_a, user_a)
    await services.prompts.create(prompt_b, user_b)

    prompts_user_a = await services.prompts.get_by_user(user_a)
    assert len(prompts_user_a) == 1
    assert prompts_user_a[0].title == "Prompt A"


@pytest.mark.asyncio
async def test_get_by_id_not_found_raises_error(services):
    with pytest.raises(PromptNotFoundError):
        await services.prompts.get_by_id(str(ObjectId()))


@pytest.mark.asyncio
async def test_update_prompt_success(services):
    user_id = str(ObjectId())

    prompt_in = PromptCreate(
        title="Prompt de prueba",
        prompt="Test prompt",
        result_example="general",
        model="ChatGPT",
        tags=["ai", "nlp"],
    )

    prompt_id = await services.prompts.create(prompt_in, user_id)

    update_data = PromptUpdate(title="Nuevo título", model="Claude")
    result = await services.prompts.update(user_id, prompt_id, update_data)

    assert result is True

    updated_prompt = await services.prompts.get_by_id(prompt_id)
    assert updated_prompt.title == "Nuevo título"
    assert updated_prompt.model == "Claude"


@pytest.mark.asyncio
async def test_update_prompt_not_found_raises_error(services):
    prompts_service = services.prompts

    with pytest.raises(PromptNotFoundError):
        await prompts_service.update(
            str(ObjectId()), str(ObjectId()), PromptUpdate(title="Test")
        )


@pytest.mark.asyncio
async def test_delete_prompt_success(services):
    prompts_service = services.prompts
    user_id = str(ObjectId())

    prompt_in = PromptCreate(
        title="Prompt de prueba",
        prompt="Test prompt",
        result_example="general",
        model="ChatGPT",
        tags=["ai", "nlp"],
    )
    prompt_id = await prompts_service.create(prompt_in, user_id)

    result = await prompts_service.delete(user_id, prompt_id)
    assert result is True

    with pytest.raises(PromptNotFoundError):
        await prompts_service.get_by_id(prompt_id)
