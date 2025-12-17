import { Card, CardContent } from "@mui/material";
import { PromptForm } from "../components/PromptForm";
import type { PromptFormValues } from "../schemas";

export function CreatePrompt() {

  const handleCreatePrompt = (data: PromptFormValues) => {
    console.log("Creating prompt with data:", data);
  }

  return (
    <Card sx={{ maxWidth: 875, mx: "auto"}}>
      <CardContent sx={{ p: 4}}>
        <PromptForm onSubmit={handleCreatePrompt} />
      </CardContent>
    </Card>
  )
}
