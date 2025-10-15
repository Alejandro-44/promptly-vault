import pytest
from bson import ObjectId

from app.services.prompts_service import PromptsService
from app.core.exceptions import PromptNotFoundError, DatabaseError
from app.schemas.prompt_schema import PromptCreate, PromptUpdate


@pytest.fixture
def service(service_factory):
    return service_factory(PromptsService)


@pytest.mark.asyncio
async def test_get_all(service, mock_repo, mocker):
    mock_repo.get.return_value = [{"title": "T1"}, {"title": "T2"}]
    mocker.patch("app.services.prompts_service.document_to_prompt", side_effect=lambda x: x)

    result = await service.get_all()

    mock_repo.get.assert_awaited_once_with()
    assert result == [{"title": "T1"}, {"title": "T2"}]


@pytest.mark.asyncio
async def test_get_by_user(service, mock_repo, mocker):
    fake_user_id = "507f1f77bcf86cd799439011"
    mock_repo.get.return_value = [{"user_id": ObjectId(fake_user_id)}]
    mocker.patch("app.services.prompts_service.document_to_prompt", side_effect=lambda x: x)

    result = await service.get_by_user(fake_user_id)

    mock_repo.get.assert_awaited_once_with({"user_id": ObjectId(fake_user_id)})
    assert result[0]["user_id"] == ObjectId(fake_user_id)


@pytest.mark.asyncio
async def test_get_by_id_found(service, mock_repo, mocker):
    fake_id = "507f1f77bcf86cd799439011"
    mock_repo.get_by_id.return_value = {"_id": ObjectId(fake_id)}
    mocker.patch("app.services.prompts_service.document_to_prompt", return_value="processed")

    result = await service.get_by_id(fake_id)

    mock_repo.get_by_id.assert_awaited_once_with(fake_id)
    assert result == "processed"


@pytest.mark.asyncio
async def test_get_by_id_not_found(service, mock_repo):
    mock_repo.get_by_id.return_value = None

    with pytest.raises(PromptNotFoundError):
        await service.get_by_id("507f1f77bcf86cd799439011")


@pytest.mark.asyncio
async def test_create_prompt_success(service, mock_repo):
    prompt_in = PromptCreate(
        title="Title",
        prompt="Do something",
        result_example="Example",
        model="gpt-4",
        tags=["tag1"]
    )
    mock_repo.create.return_value.inserted_id = ObjectId("507f1f77bcf86cd799439011")

    result = await service.create(prompt_in, "507f1f77bcf86cd799439012")

    mock_repo.create.assert_awaited_once()
    assert result == "507f1f77bcf86cd799439011"


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
        await service.create(prompt_in, "507f1f77bcf86cd799439012")


@pytest.mark.asyncio
async def test_update_prompt_success(service, mock_repo):
    fake_prompt_id = "507f1f77bcf86cd799439011"
    fake_user_id = "507f1f77bcf86cd799439012"
    mock_repo.get.return_value = [{"_id": ObjectId(fake_prompt_id)}]
    mock_repo.update.return_value.modified_count = 1

    update_data = PromptUpdate(title="New Title")

    result = await service.update(fake_user_id, fake_prompt_id, update_data)

    mock_repo.get.assert_awaited_once_with({
        "_id": ObjectId(fake_prompt_id),
        "user_id": ObjectId(fake_user_id)
    })
    mock_repo.update.assert_awaited_once()
    assert result is True


@pytest.mark.asyncio
async def test_update_prompt_not_found(service, mock_repo):
    mock_repo.get.return_value = []
    update_data = PromptUpdate(title="New Title")

    with pytest.raises(PromptNotFoundError):
        await service.update("507f1f77bcf86cd799439012", "507f1f77bcf86cd799439011", update_data)


@pytest.mark.asyncio
async def test_update_prompt_no_modification(service, mock_repo):
    fake_prompt_id = "507f1f77bcf86cd799439011"
    fake_user_id = "507f1f77bcf86cd799439012"
    mock_repo.get.return_value = [{"_id": ObjectId(fake_prompt_id)}]
    mock_repo.update.return_value.modified_count = 0

    update_data = PromptUpdate(title="Same Title")

    with pytest.raises(DatabaseError):
        await service.update(fake_user_id, fake_prompt_id, update_data)


@pytest.mark.asyncio
async def test_delete_prompt_success(service, mock_repo):
    fake_prompt_id = "507f1f77bcf86cd799439011"
    fake_user_id = "507f1f77bcf86cd799439012"
    mock_repo.get.return_value = [{"_id": ObjectId(fake_prompt_id)}]

    result = await service.delete(fake_user_id, fake_prompt_id)

    mock_repo.get.assert_awaited_once_with({
        "_id": ObjectId(fake_prompt_id),
        "user_id": ObjectId(fake_user_id)
    })
    mock_repo.delete.assert_awaited_once_with(fake_prompt_id)
    assert result is True


@pytest.mark.asyncio
async def test_delete_prompt_not_found(service, mock_repo):
    mock_repo.get.return_value = []

    with pytest.raises(PromptNotFoundError):
        await service.delete("507f1f77bcf86cd799439012", "507f1f77bcf86cd799439011")
