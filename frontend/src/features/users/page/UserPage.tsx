import { Container, Typography } from "@mui/material";
import { UserCard } from "../components/UserCard";
import { useUserPrompts } from "../hooks/useUserPrompts";
import { PromptsGrid } from "@/features/prompts/components/PromptsGrid";
import { useUser } from "../hooks/useUser";
import { useParams } from "react-router";

type UserPageProps = {
  mode: "me" | "public";
};

export function UserPage({ mode }: UserPageProps) {
  const params = useParams();
  const userId = mode === "public" ? params.userId! : undefined;
  const { user } = useUser({ mode, userId });
  const { prompts } = useUserPrompts({ mode, userId });

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <UserCard user={user!} />
      </Container>
      <Container sx={{ mt: 2 }}>
        <Typography variant="h5" component="h2">
          {mode === "me" ? "My Prompts" : `${user?.username}'s prompts`}
        </Typography>
        <PromptsGrid prompts={prompts} />
      </Container>
    </>
  );
}
