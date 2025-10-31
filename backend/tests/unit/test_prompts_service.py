import pytest
from bson import ObjectId

from app.services.prompts_service import PromptsService
from app.core.exceptions import PromptNotFoundError, DatabaseError
from app.schemas.prompt_schema import PromptCreate, PromptUpdate

MOCK_PROMPT_ID = "507f1f77bcf86cd799439011"
MOCK_USER_ID = "507f1f77bcf86cd799439012"
MOCK_RANDOM_ID = "507f1f77bcf86cd799439013"


@pytest.fixture
def service(service_factory):
    return service_factory(PromptsService)


@pytest.mark.asyncio
async def test_get_all(service, mock_repo, mocker):
    mock_repo.get.return_value = [{"title": "T1"}, {"title": "T2"}]
    mocker.patch("app.schemas.prompt_schema.Prompt.from_document", side_effect=lambda x: x)

    result = await service.get_all()

    mock_repo.get.assert_awaited_once_with()
    assert result == [{"title": "T1"}, {"title": "T2"}]


@pytest.mark.asyncio
async def test_get_by_user(service, mock_repo, mocker):
    mock_repo.get.return_value = [{"user_id": ObjectId(MOCK_USER_ID)}]
    mocker.patch("app.schemas.prompt_schema.Prompt.from_document", side_effect=lambda x: x)

    result = await service.get_by_user(MOCK_USER_ID)

    mock_repo.get.assert_awaited_once_with({"user_id": ObjectId(MOCK_USER_ID)})
    assert result[0]["user_id"] == ObjectId(MOCK_USER_ID)


@pytest.mark.asyncio
async def test_get_by_id_found(service, mock_repo, mocker):
    mock_repo.get_by_id.return_value = {"_id": ObjectId(MOCK_PROMPT_ID)}
    mocker.patch("app.schemas.prompt_schema.Prompt.from_document", side_effect=lambda prompt: str(prompt["_id"]))

    result = await service.get_by_id(MOCK_PROMPT_ID)

    mock_repo.get_by_id.assert_awaited_once_with(MOCK_PROMPT_ID)
    assert result == MOCK_PROMPT_ID


@pytest.mark.asyncio
async def test_get_by_id_not_found(service, mock_repo):
    mock_repo.get_by_id.return_value = None

    with pytest.raises(PromptNotFoundError):
        await service.get_by_id(MOCK_RANDOM_ID)


@pytest.mark.asyncio
async def test_create_prompt_success(service, mock_repo):
    prompt_in = PromptCreate(
        title="Title",
        prompt="Do something",
        result_example="Example",
        model="gpt-4",
        tags=["tag1"]
    )
    mock_repo.create.return_value = MOCK_PROMPT_ID

    result = await service.create(MOCK_USER_ID ,prompt_in)

    mock_repo.create.assert_awaited_once()
    assert result == MOCK_PROMPT_ID


@pytest.mark.asyncio
async def test_create_prompt_database_error(service, mock_repo):
    prompt_in = PromptCreate(
        title="Title",
        prompt="Do something",
        result_example="Example",
        model="gpt-4",
        tags=["tag1"]
    )
    mock_repo.create.side_effect = Exception("DB failure")

    with pytest.raises(DatabaseError):
        await service.create(MOCK_USER_ID, prompt_in)


@pytest.mark.asyncio
async def test_update_prompt_success(service, mock_repo):
    mock_repo.update.return_value = True

    update_data = PromptUpdate(title="New Title")

    result = await service.update(MOCK_USER_ID, MOCK_PROMPT_ID, update_data)

    mock_repo.update.assert_awaited_once()
    assert result is True


@pytest.mark.asyncio
async def test_update_prompt_not_found(service, mock_repo):
    mock_repo.update.return_value = False
    update_data = PromptUpdate(title="New Title")

    with pytest.raises(PromptNotFoundError):
        await service.update(MOCK_USER_ID, MOCK_RANDOM_ID, update_data)


@pytest.mark.asyncio
async def test_update_prompt_no_modification(service, mock_repo):
    mock_repo.update.side_effect = Exception()

    update_data = PromptUpdate(title="Same Title")

    with pytest.raises(DatabaseError):
        await service.update(MOCK_USER_ID, MOCK_PROMPT_ID, update_data)


@pytest.mark.asyncio
async def test_delete_prompt_success(service, mock_repo):
    mock_repo.delete.return_value = True

    result = await service.delete(MOCK_PROMPT_ID, MOCK_USER_ID)

    mock_repo.delete.assert_awaited_once_with(MOCK_PROMPT_ID, MOCK_USER_ID)
    assert result is True


@pytest.mark.asyncio
async def test_delete_prompt_not_found(service, mock_repo):
    mock_repo.delete.return_value = False

    with pytest.raises(PromptNotFoundError):
        await service.delete(MOCK_USER_ID, MOCK_RANDOM_ID)
