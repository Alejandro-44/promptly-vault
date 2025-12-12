import pytest
from bson import ObjectId
from app.schemas.prompt_schema import PromptCreate, PromptUpdate
from app.schemas.user_schema import UserCreate
from app.core.exceptions import PromptNotFoundError


@pytest.mark.asyncio
async def test_create_prompt_success(services):
    test_user = UserCreate(
        username="testuser",
        email="testuser@example.com",
        password="securepassword"
    )

    await services.user.register_user(test_user)

    test_user = await services.user.get_by_email(test_user.email)
    user_id = test_user.id

    prompt_in = PromptCreate(
        title="Test prompt",
        prompt="Test prompt",
        result_example="something incredible",
        model="ChatGPT",
        tags=["ai", "nlp"],
    )

    prompt_id = await services.prompts.create(user_id, prompt_in)

    assert isinstance(prompt_id, str)
    prompt = await services.prompts.get_by_id(prompt_id)

    assert prompt.title == "Test prompt"
    assert prompt.author.id == user_id
    assert prompt.model == "ChatGPT"


@pytest.mark.asyncio
async def test_get_by_user_returns_only_user_prompts(services):
    user_a = UserCreate(
        username="usera",
        email="usera@example.com",
        password="passwordA"
    )
    user_b = UserCreate(
        username="userb",
        email="userb@example.com",
        password="passwordB"
    )

    await services.user.register_user(user_a)
    await services.user.register_user(user_b)

    user_a = await services.user.get_by_email(user_a.email)
    user_b = await services.user.get_by_email(user_b.email)
    user_a_id = user_a.id
    user_b_id = user_b.id

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

    await services.prompts.create(user_a_id, prompt_a)
    await services.prompts.create(user_b_id, prompt_b)

    prompts_user_a = await services.prompts.get_by_user(user_a_id)
    assert len(prompts_user_a) == 1
    assert prompts_user_a[0].title == "Prompt A"


@pytest.mark.asyncio
async def test_get_by_id_not_found_raises_error(services):
    with pytest.raises(PromptNotFoundError):
        await services.prompts.get_by_id(str(ObjectId()))


@pytest.mark.asyncio
async def test_update_prompt_success(services):
    test_user = UserCreate(
        username="testuser",
        email="testuser@example.com",
        password="securepassword"
    )

    await services.user.register_user(test_user)

    test_user = await services.user.get_by_email(test_user.email)
    test_user_id = test_user.id

    prompt_in = PromptCreate(
        title="Test prompt",
        prompt="Test prompt",
        result_example="something incredible",
        model="ChatGPT",
        tags=["ai", "nlp"],
    )

    prompt_id = await services.prompts.create(test_user_id, prompt_in)

    update_data = PromptUpdate(title="New Title", model="Claude")
    result = await services.prompts.update(prompt_id, test_user_id, update_data)

    assert result is True

    updated_prompt = await services.prompts.get_by_id(prompt_id)
    assert updated_prompt.title == "New Title"
    assert updated_prompt.model == "Claude"


@pytest.mark.asyncio
async def test_update_prompt_not_found_raises_error(services):
    with pytest.raises(PromptNotFoundError):
        await services.prompts.update(
            str(ObjectId()), str(ObjectId()), PromptUpdate(title="Test")
        )


@pytest.mark.asyncio
async def test_delete_prompt_success(services):
    prompts_service = services.prompts
    user_id = str(ObjectId())

    prompt_in = PromptCreate(
        title="Test prompt",
        prompt="Test prompt",
        result_example="something incredible",
        model="ChatGPT",
        tags=["ai", "nlp"],
    )
    prompt_id = await prompts_service.create(user_id, prompt_in)

    result = await prompts_service.delete(prompt_id, user_id)
    assert result is True

    with pytest.raises(PromptNotFoundError):
        await prompts_service.get_by_id(prompt_id)
