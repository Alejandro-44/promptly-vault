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
  id: string;
  title: string;
  model: string;
  user: string;
  tags: string[];
};

export function PromptCard({ id, title, model, user, tags }: Props) {
  return (
    <Card sx={{ height: "100%", transition: "all 0.2s ease-in-out" }}>
      <CardActionArea
        sx={{ height: "inherit", mb: 2 }}
        component={Link}
        to={`/prompts/${id}`}
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
            {title}
          </Typography>
          <Stack spacing={1.5}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              {tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography>By {user}</Typography>
              <Typography>{model}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
