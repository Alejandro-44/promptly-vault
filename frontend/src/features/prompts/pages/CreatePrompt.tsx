import { Card, CardContent } from "@mui/material";
import { PromptForm } from "../components/PromptForm";
import type { PromptFormValues } from "../schemas";
import { useCreatePrompt } from "../hooks";

export function CreatePrompt() {
  const { mutate, isPending } = useCreatePrompt()

  const handleCreatePrompt = (data: PromptFormValues) => {
    mutate(data)
  }

  return (
    <Card sx={{ maxWidth: 875, mx: "auto"}}>
      <CardContent sx={{ p: 4}}>
        <PromptForm mode="create" onSubmit={handleCreatePrompt} isLoading={isPending} />
      </CardContent>
    </Card>
  )
}
