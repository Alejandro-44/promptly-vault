import pytest
from bson import ObjectId
from app.schemas.comment_schema import CommentCreate, CommentUpdate
from app.core.exceptions import CommentNotFoundError

MOCK_USER_ID = str(ObjectId())
MOCK_PROMPT_ID = str(ObjectId())
MOCK_RANDOM_ID = str(ObjectId())


@pytest.mark.asyncio
async def test_create_comment_success(services):
    mock_comment = CommentCreate(content="Awesome!")
    comment_id = await services.comments.create(MOCK_PROMPT_ID, MOCK_USER_ID, mock_comment)
    assert isinstance(comment_id, str)


@pytest.mark.asyncio
async def test_create_comments_and_get(services):
    mock_comment_a = CommentCreate(content="Hey! It's useful")
    mock_comment_b = CommentCreate(content="Awesome!")
    
    await services.comments.create(MOCK_PROMPT_ID, MOCK_USER_ID, mock_comment_a)
    await services.comments.create(MOCK_PROMPT_ID, MOCK_RANDOM_ID, mock_comment_b)

    comments = await services.comments.get_prompt_comments(MOCK_PROMPT_ID)

    assert len(comments) == 2


@pytest.mark.asyncio
async def test_update_comment_success(services):
    mock_comment = CommentCreate(
        content="Awesome!"
    )

    comment_id = await services.comments.create(MOCK_PROMPT_ID, MOCK_USER_ID, mock_comment)

    update_data = CommentUpdate(
        content="WOW!"
    )

    result = await services.comments.update(comment_id, MOCK_USER_ID, update_data)

    assert result


@pytest.mark.asyncio
async def test_update_comment_not_found_raises_error(services):
    with pytest.raises(CommentNotFoundError):
        await services.comments.update(
            MOCK_RANDOM_ID, MOCK_USER_ID, CommentCreate(content="Test")
        )


@pytest.mark.asyncio
async def test_delete_comment_success(services):
    mock_comment = CommentCreate(
        content="Awesome!"
    )
    comment_id = await services.comments.create(MOCK_PROMPT_ID, MOCK_USER_ID, mock_comment)

    comments = await services.comments.get_prompt_comments(MOCK_PROMPT_ID)
    assert len(comments) == 1

    result = await services.comments.delete(comment_id, MOCK_USER_ID)
    assert result is True

    comments = await services.comments.get_prompt_comments(MOCK_PROMPT_ID)
    assert len(comments) == 0
