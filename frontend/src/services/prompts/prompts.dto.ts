export type PromptDTO = {
  id: string;
  title: string;
  prompt: string;
  result_example: string;
  model: string;
  tags: string[];
  pub_date: string;
  author: {
    id: string;
    username: string;
    email: string;
  };
};

export type PromptSummaryDTO = {
  id: string;
  title: string;
  tags: string[];
  model: string;
  pub_date: string;
  author_name: string;
};
