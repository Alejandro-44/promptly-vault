import type { PromptSummary } from "@/services";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

type Props = {
  prompt: PromptSummary;
};

export function PromptCard({ prompt }: Props) {
  return (
    <Card sx={{ height: "100%", transition: "all 0.2s ease-in-out" }} data-testid="prompt-card">
      <CardActionArea
        sx={{ height: "inherit", mb: 2 }}
        component={Link}
        to={`/prompts/${prompt.id}`}
        data-testid="prompt-link"
      >
        <CardContent
          sx={{
            height: "inherit",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography component="h3" variant="h6">
            {prompt.title}
          </Typography>
          <Stack spacing={1.5}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              {prompt.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography>By {prompt.authorName}</Typography>
              <Typography>{prompt.model}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
