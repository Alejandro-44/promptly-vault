import { CircularProgress, Container } from "@mui/material";

export function LoadingPage() {
  return (
    <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CircularProgress />
    </Container>
  )
}
