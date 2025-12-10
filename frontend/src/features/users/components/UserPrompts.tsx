import { Container, Grid, Typography } from "@mui/material";
import { useMyPrompts } from "../hooks/useMyPrompts";
import { PromptCard } from "@/features/prompts/components/PromptCard";

export default function UserPrompts() {
  const { prompts } = useMyPrompts();

  return (
    <>
      <Container sx={{ mt: 6 }}>
        <Typography component="h2" variant="h4">Your prompts</Typography>
      </Container>
      <Grid container spacing={2} sx={{ mt: 2, alignItems: 'stretch' }}>
        {
          prompts?.map((prompt) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={prompt.id}>
              <PromptCard {...prompt} />
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}
