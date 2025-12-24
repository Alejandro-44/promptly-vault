import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        403
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" gutterBottom>
        You do not have permission to access this page.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/login")}>
        Login
      </Button>
    </Container>
  );
}
