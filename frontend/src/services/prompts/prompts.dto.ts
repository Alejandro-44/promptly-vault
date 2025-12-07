export type PromptDTO = {
  id: string | null;
  title: string;
  prompt: string;
  result_example: string;
  model: string;
  tags: string[];
  user_id: string;
  pub_date: string;
};
