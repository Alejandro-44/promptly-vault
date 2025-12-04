import { Card, CardContent, Container, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";

export function LoginPage() {
  return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h1" align="center" sx={{ mb: 2 }} >
              Login
            </Typography>
            <LoginForm />
          </CardContent>
        </Card>
      </Container>
  );
}
