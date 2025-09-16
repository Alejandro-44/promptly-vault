from app.schemas.comment_schema import Comment

def document_to_prompt(document) -> Comment:
    return Comment(
        id=str(document["_id"]),
        content=document["content"],
        prompt_id=str(document["prompt_id"]),
        user_id=str(document["user_id"]),
        creation_date=document["creation_date"],
    )