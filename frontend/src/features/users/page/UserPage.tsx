import { Container, Typography } from "@mui/material";
import { UserCard } from "../components/UserCard";
import { useUserPrompts } from "../hooks/useUserPrompts"
import { PromptsGrid } from "@/features/prompts/components/PromptsGrid";
import { useUserStore } from "../contexts";

export function UserPage() {
  const user = useUserStore((state) => state.user);
  const { prompts } = useUserPrompts();

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <UserCard user={user!} />
      </Container>
      <Container>
        <Typography variant="h5" component="h2">My Prompts</Typography>
        <PromptsGrid prompts={prompts} />
      </Container>
    </>
  );
}
