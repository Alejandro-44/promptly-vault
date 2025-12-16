import { useParams } from "react-router"
import { PromptCardDetail } from "../components/PromptCardDetail";
import { Container } from "@mui/material";

export function PromptDetail() {
  const params = useParams<{ promptId: string }>();

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <PromptCardDetail promptId={params.promptId!} />
      </Container>
    </>
  )
}
