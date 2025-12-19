import { Card, CardContent } from "@mui/material";
import { PromptForm } from "../components/PromptForm";
import type { PromptFormValues } from "../schemas";
import type { Prompt, PromptCreate } from "@/services";
import { useOutletContext } from "react-router";
import { getPromptChanges } from "@/utils";

export function EditPrompt() {
  const { prompt } = useOutletContext<{ prompt: Prompt }>();

  console.log(prompt)

  const handleCreatePrompt = (data: PromptFormValues) => {
    const originalPrompt: PromptCreate = {
    title: prompt.title,
    prompt: prompt.prompt,
    model: prompt.model,
    tags: prompt.tags,
    resultExample: prompt.resultExample,
  };
    const changes = getPromptChanges(originalPrompt, data)
    console.log("New prompt data:", changes)
  }

  return (
    <Card sx={{ maxWidth: 875, mx: "auto"}}>
      <CardContent sx={{ p: 4}}>
        <PromptForm mode="edit" onSubmit={handleCreatePrompt} defaultValues={prompt} />
      </CardContent>
    </Card>
  )
}
