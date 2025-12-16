import { PromptsGrid } from "@/features/prompts/components/PromptsGrid";
import { usePrompts } from "@/features/prompts/hooks/usePrompts";

export function HomePage() {
  const { prompts } = usePrompts();

  return (
      <PromptsGrid prompts={prompts} />
  )
}
