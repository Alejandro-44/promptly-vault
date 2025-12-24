import { Grid } from "@mui/material";
import { PromptCard } from "./PromptCard";
import type { PromptSummary } from "@/services";

interface PromptsGridProps {
  prompts?: PromptSummary[];
  editable?: boolean;
}


export function PromptsGrid({ prompts, editable }: PromptsGridProps) {
  return (
    <Grid role="grid" sx={{ mt: 2 }} container spacing={2}>
      {
          prompts?.map((prompt) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={prompt.id}>
              <PromptCard prompt={prompt} editable={editable} />
            </Grid>
          ))
        }
    </Grid>
  )
}
