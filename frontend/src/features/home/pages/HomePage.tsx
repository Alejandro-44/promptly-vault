import { Container } from "@mui/material";
import { PromptsGrid } from "@/features/prompts/components/PromptsGrid";
import { usePrompts } from "@/features/prompts/hooks/usePrompts";

export function HomePage() {
  const { prompts } = usePrompts();

  return (
    <Container>
      <PromptsGrid prompts={prompts} />
    </Container>
  )
}
