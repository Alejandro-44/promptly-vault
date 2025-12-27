import type { PromptComment } from '@/services'
import { List } from '@mui/material'
import { Comment } from './Comment';

type CommentsListProps = {
  comments: PromptComment[];
}

export function CommentsList({ comments }: CommentsListProps) {
  return (
    <List>
      {comments.map((comment) => (<Comment key={comment.id} comment={comment} />))}
    </List>
  )
}
