import { CircularProgress, Container } from "@mui/material";

export function LoadingPage() {
  return (
    <Container
      sx={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
}
