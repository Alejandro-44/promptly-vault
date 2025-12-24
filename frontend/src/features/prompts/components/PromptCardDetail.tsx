import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { usePrompt } from "../hooks";
import { PromptTags } from "./PromptTags";
import { CopyIcon } from "lucide-react";
import { Link } from "react-router";
import { useRedirectOn } from "@/features/auth/hooks";

type Props = {
  promptId: string;
};

export function PromptCardDetail({ promptId }: Props) {
  const { data: prompt, error } = usePrompt({ promptId });
  useRedirectOn({ when: error?.status === 404, to: "/404" });

  return (
    <Card component="article" sx={{ maxWidth: "md", mx: "auto" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography sx={{ mb: 2 }} variant="body1">
          {prompt?.model}
        </Typography>
        <PromptTags tags={prompt?.tags || []} />
        <Typography sx={{ mt: 2 }} component="h1" variant="h4" fontWeight={600}>
          {prompt?.title}
        </Typography>
        <Stack
          data-testid="author-link"
          component={Link}
          to={`/users/${prompt?.author.id}`}
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Avatar sx={{ backgroundColor: "#f14b09ff", width: 40, height: 40 }}>
            {prompt?.author.username.slice(0, 2).toUpperCase()}
          </Avatar>
          <Typography sx={{ ":hover": { textDecoration: "underline" } }}>
            {prompt?.author.username}
          </Typography>
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Prompt
            </Typography>
            <Button variant="outlined" size="small" startIcon={<CopyIcon />}>
              Copy
            </Button>
          </Box>
          <Paper
            sx={{
              p: 3,
              bgcolor: "#E8E8E8",
            }}
            variant="outlined"
          >
            <Typography
              component="pre"
              sx={{
                fontFamily: "monospace",
                fontSize: "0.875rem",
                whiteSpace: "pre-wrap",
                m: 0,
                color: "text.primary",
                lineHeight: 1.6,
              }}
            >
              {prompt?.prompt}
            </Typography>
          </Paper>
        </Box>
        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Result
          </Typography>
          <Typography sx={{ lineHeight: 1.7 }}>
            {prompt?.resultExample}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
