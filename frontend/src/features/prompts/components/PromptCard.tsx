import type { PromptSummary } from "@/services";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { PromptTags } from "./PromptTags";
import { Sparkles } from "lucide-react";

type Props = {
  prompt: PromptSummary;
};

export function PromptCard({ prompt }: Props) {
  return (
    <Card
      sx={{ height: "100%", transition: "all 0.2s ease-in-out" }}
      data-testid="prompt-card"
    >
      <CardActionArea
        sx={{ height: "inherit", mb: 2 }}
        component={Link}
        to={`/prompts/${prompt.id}`}
        data-testid="prompt-link"
      >
        <CardContent sx={{ height: "100%" }}>
          <Grid sx={{ height: "inherit" }} container spacing={1} alignItems="space-between">
            <Grid size={12} alignContent="space-between">
              <Stack alignItems="baseline" direction="row" spacing={2}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Sparkles fill="inherit" stroke={"1px"} size={16} />
                  <Typography>{prompt.model}</Typography>
                </Stack>
                <PromptTags tags={prompt.tags} />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Typography component="h3" variant="h6">
                {prompt.title}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography>By {prompt.authorName}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
