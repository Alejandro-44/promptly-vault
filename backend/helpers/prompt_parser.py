from app.schemas.prompt_schema import Prompt

def document_to_prompt(document) -> Prompt:
    return Prompt(
        id=str(document["_id"]),
        title=document["title"],
        prompt=document["text"],
        result_example=document["result_example"],
        model=document["model"],
        tags=document.get("tags", []),
        user_id=str(document["user_id"]),
        creation_date=document["creation_date"],
    )