import Input from "@/components/Input";
import { Button, Grid, Stack } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { usePromptForm } from "../hooks/usePromptForm";
import type { PromptFormValues } from "../schemas";

const MODELS = ["gpt-4", "gpt-4o", "claude-3", "gemini-pro"];

type PromptFormProps = {
  onSubmit: (data: PromptFormValues) => void;
  isLoading?: boolean;
};

export function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const methods = usePromptForm();

  const handleSubmit = methods.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <FormProvider {...methods}>
      <form>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Input name="title" label="Title" />
          </Grid>
          <Grid size={12}>
            <Input name="prompt" label="Prompt" multiline rows={4} />
          </Grid>
          <Grid size={6}>
            <Input name="tags" label="Tags" />
          </Grid>
          <Grid size={6}>
            <Input name="model" label="Model" />
          </Grid>
          <Grid size={12}>
            <Input name="result" label="Result" multiline rows={4} />
          </Grid>
          <Grid size={12}>
            <Stack direction="row-reverse" spacing={2}>
              <Button variant="contained" type="submit" disabled={isLoading}>
                Share
              </Button>
              <Button variant="outlined" disabled={isLoading}>
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
