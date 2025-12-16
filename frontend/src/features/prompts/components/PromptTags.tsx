import { Box, Chip } from "@mui/material";

type PromptTagsProps = {
  tags: string[];
};

export function PromptTags({ tags }: PromptTagsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
      }}
    >
      {tags.map((tag) => (
        <Chip key={tag} label={tag} size="small" />
      ))}
    </Box>
  );
}
