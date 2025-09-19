from datetime import datetime

from fastapi import HTTPException, status
from bson import ObjectId

from app.repositories.prompts_repository import PromptsRepository
from app.schemas.prompt_schema import PromptCreate, PromptUpdate
from app.helpers.prompt_parser import document_to_prompt

class PromptsService:
    def __init__(self, pormpts_repo: PromptsRepository):
        self.pormpts_repo = pormpts_repo

    def process_prompts_documents(prompts_documents):
        return [document_to_prompt(document) for document in prompts_documents]
    
    async def get_all(self):
        prompts_documents = self.pormpts_repo.get()
        return self.process_prompts_documents(prompts_documents)

    async def get_by_user(self, user_id: dict):
        prompts_documents = self.pormpts_repo.get({ "user_id": ObjectId(user_id) })
        return self.process_prompts_documents(prompts_documents)
    
    async def get_by_id(self, prompt_id: str):
        prompt_document = self.pormpts_repo.get_by_id(prompt_id)
        if not prompt_document:
            HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Prompt not found"
            )
        await document_to_prompt(prompt_document)

    async def create(self, prompt_in: PromptCreate, user_id: str):
        prompt_data = prompt_in.model_dump()
        prompt_data.update({
            "user_id": ObjectId(user_id),
            "pub_date": datetime.now()
        })

        try:
            result = await self.pormpts_repo.create(prompt_data)
        except:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong with database"
            )

        return str(result.inserted_id)
    
    async def update(self, user_id: str, prompt_id: str, update_data: PromptUpdate):
        prompt_document = await self.pormpts_repo.get({
            "_id": ObjectId(prompt_id),
            "user_id": ObjectId(user_id)
        })
        if not prompt_document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Prompt not found"
            )
        new_data = update_data.model_dump(exclude_unset=True)
        result = await self.pormpts_repo.update(prompt_id, new_data)
        if not result.modified_count > 0:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong with database"
            )
        
        return True
    
    async def delete(self, user_id: str, prompt_id: str):
        prompt_document = await self.pormpts_repo.get({
            "_id": ObjectId(prompt_id),
            "user_id": ObjectId(user_id)
        })
        if not prompt_document:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Prompt not found"
            )
        await self.pormpts_repo.delete(prompt_id)
        return True