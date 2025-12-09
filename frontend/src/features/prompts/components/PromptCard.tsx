import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
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
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        component={Link}
        to={`prompts/${id}`}
        data-testid="prompt-link"
      >
        <CardContent>
          <Typography component="h3" variant="h5">
            {title}
          </Typography>
          <Typography component="p" variant="body2">
            
            By {user}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            
            {tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "text.secondary",
            }}
          >
            
            <Typography variant="caption">{model}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
