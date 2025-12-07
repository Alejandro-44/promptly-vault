export type Prompt = {
  id: string | null;
  title: string;
  prompt: string;
  resultExample: string;
  model: string;
  tags: string[];
  userId: string;
  pubDate: Date;
};
