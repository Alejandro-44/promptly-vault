import { Card, CardContent, Container, Typography } from "@mui/material";
import RegisterForm from "../components/RegisterForm";

export function RegisterPage() {
  return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h1" align="center" sx={{ mb: 2 }} >
              Register
            </Typography>
            <RegisterForm />
          </CardContent>
        </Card>
      </Container>
  );
}
