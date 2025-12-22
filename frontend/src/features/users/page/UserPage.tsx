import { Container, Typography, CircularProgress } from "@mui/material";
import { UserCard } from "../components/UserCard";
import { useUser, useUserPrompts } from "../hooks";
import { PromptsGrid } from "@/features/prompts/components/PromptsGrid";
import { useParams } from "react-router";

type UserPageProps = {
  mode: "me" | "public";
};

export function UserPage({ mode }: UserPageProps) {
  const params = useParams();
  const userId = mode === "public" ? params.userId : undefined;
  const { user, isLoading, error } = useUser({ mode, userId });
  const { prompts } = useUserPrompts({ mode, userId });

  if (isLoading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Error loading user: {error.message}
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">
          User not found
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <UserCard user={user} />
      </Container>
      <Container sx={{ mt: 2 }}>
        <Typography variant="h5" component="h2">
          {mode === "me" ? "My Prompts" : `${user.username}'s prompts`}
        </Typography>
        <PromptsGrid prompts={prompts} editable={mode === "me"} />
      </Container>
    </>
  );
}
