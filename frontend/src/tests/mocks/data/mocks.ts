export const prompts = [
  {
    id: "abc-123",
    title: "Generate a marketing headline",
    prompt: "Write a catchy marketing headline for a SaaS that helps users automate workflows.",
    result_example: "Automate Everything: The Smartest Way to Scale Your Productivity.",
    model: "gpt-4",
    tags: ["marketing", "copywriting", "saas"],
    user_id: "1",
    pub_date: "2024-01-15T10:30:00Z",
  },
  {
    id: "def-456",
    title: "Refactor JavaScript Code",
    prompt: "Refactor the following JavaScript snippet for readability and performance: {{code}}",
    result_example: "I've simplified the conditional logic and removed unnecessary variables.",
    model: "gpt-4o",
    tags: ["javascript", "refactor", "programming"],
    user_id: "1",
    pub_date: "2024-02-02T16:45:00Z",
  },
  {
    id: "ghi-789",
    title: "Character backstory generator",
    prompt: "Create a fantasy-style backstory for a character named Arin who is a rogue alchemist.",
    result_example: "Arin grew up scavenging ingredients from abandoned ruins...",
    model: "gpt-3.5",
    tags: ["storytelling", "writing", "fantasy"],
    user_id: "1",
    pub_date: "2024-02-10T08:12:00Z",
  },
];

export const users = [
  {
    id: "1",
    username: "johndoe",
    email: "johndoe@example.com",
    is_active: true,
  },
];
