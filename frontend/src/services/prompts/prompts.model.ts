export type Prompt = {
  id: string;
  title: string;
  prompt: string;
  resultExample: string;
  model: string;
  tags: string[];
  pubDate: Date;
  author: {
    id: string;
    username: string;
    email: string;
  };
};

export type PromptSummary = {
  id: string;
  title: string;
  tags: string[];
  model: string;
  pubDate: Date;
  authorId: string;
  authorName: string;
};
