import Input from "@/components/Input";
import { Button, Grid, Stack } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { usePromptForm } from "../hooks/usePromptForm";
import type { PromptFormValues } from "../schemas";
import { RHFAutocomplete } from "@/components/RHFAutocomplete";
import type { PromptCreate } from "@/services";
import { useEffect } from "react";

const MODELS = [
  { id: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { id: "gpt-4", label: "GPT-4" },
  { id: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { id: "claude-2", label: "Claude 2" },
  { id: "gemini-3-pro", label: "Gemini 3 Pro" },
];
const TAGS = [
  { id: "productivity", label: "Productivity" },
  { id: "creativity", label: "Creativity" },
  { id: "education", label: "Education" },
  { id: "entertainment", label: "Entertainment" },
  { id: "marketing", label: "Marketing" },
  { id: "saas", label: "SaaS"},
  { id: "copywriting", label: "Copywriting"}
];

type PromptFormProps = {
  mode: "create" | "edit";
  onSubmit: (data: PromptFormValues) => void;
  isLoading?: boolean;
  defaultValues?: PromptCreate;
};

export function PromptForm({
  mode,
  onSubmit,
  isLoading,
  defaultValues,
}: PromptFormProps) {
  const methods = usePromptForm();

  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      methods.reset({
        title: defaultValues.title,
        prompt: defaultValues.prompt,
        model: defaultValues.model,
        tags: defaultValues.tags,
        resultExample: defaultValues.resultExample,
      });
    }
  }, [mode, defaultValues, methods]);

  const handleSubmit = methods.handleSubmit((data) => {
    onSubmit(data);
    if (mode === "create") {
      methods.reset();
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Input name="title" label="Title" />
          </Grid>
          <Grid size={12}>
            <Input name="prompt" label="Prompt" multiline rows={4} />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <RHFAutocomplete name="model" label="Model" options={MODELS} />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <RHFAutocomplete name="tags" label="Tags" options={TAGS} multiple />
          </Grid>
          <Grid size={12}>
            <Input name="resultExample" label="Result" multiline rows={4} />
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
