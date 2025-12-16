import { useParams } from "react-router"
import { PromptCardDetail } from "../components/PromptCardDetail";

export function PromptDetail() {
  const params = useParams<{ promptId: string }>();

  return (
    <>
      <PromptCardDetail promptId={params.promptId!} />
    </>
  )
}
