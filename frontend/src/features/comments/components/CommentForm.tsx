import Input from "@/components/Input";
import { FormProvider, useForm } from "react-hook-form";
import {
  commentSchema,
  type CommentFormValues,
} from "../schema/comment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Stack } from "@mui/material";
import type { User } from "@/services";

type CommentFormProps = {
  user: User;
}

export function CommentForm({ user }: CommentFormProps) {
  const methods = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
  });

  return (
    <FormProvider {...methods}>
      <form>
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ width: 32, height: 32, fontSize: 16 }} >{user?.username.slice(0, 2).toUpperCase()}</Avatar>
          <Input
            variant="standard"
            name="content"
            label=""
            placeholder="Add your comment..."
          />
        </Stack>
      </form>
    </FormProvider>
  );
}
