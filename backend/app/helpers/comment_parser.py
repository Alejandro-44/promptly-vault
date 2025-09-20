from app.schemas.comment_schema import Comment

def document_to_comment(document) -> Comment:
    return Comment(
        id=str(document["_id"]),
        content=document["content"],
        prompt_id=str(document["prompt_id"]),
        user_id=str(document["user_id"]),
        pub_date=document["pub_date"],
    )