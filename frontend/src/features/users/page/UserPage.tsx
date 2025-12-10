import { Container } from "@mui/material";
import UserCard from "../components/UserCard";
import UserPrompts from "../components/UserPrompts";

export default function UserPage() {

  return (
    <Container sx={{ mt: 4 }}>
      <UserCard />
      <UserPrompts />
    </Container>
  );
}
