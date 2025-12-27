import type { PromptComment } from "@/services";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

type CommentProps = {
  comment: PromptComment;
};

export function Comment({ comment }: CommentProps) {
  return (
      <ListItem sx={{ p: 0 }} alignItems="center">
        <ListItemAvatar>
          <Avatar>{comment.author.slice(0, 2).toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Typography fontWeight={600}>{comment.author}</Typography>}
          secondary={<Typography>{comment.content}</Typography>}
        ></ListItemText>
      </ListItem>
  );
}
