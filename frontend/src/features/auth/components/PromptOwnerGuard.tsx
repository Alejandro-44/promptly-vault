import { Outlet, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../hooks";
import { usePrompt } from "@/features/prompts/hooks/usePrompt";

export function PromptOwnerGuard() {
  const { promptId } = useParams();
  const id = promptId || "";
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: prompt, isLoading, error } = usePrompt({ promptId: id });

  useEffect(() => {
    if (error) {
      navigate("/");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (prompt && prompt.author.id !== user!.id) {
      navigate("/");
    }
  }, [prompt, user, navigate]);

  if (isLoading) {
    return <div>Loading prompt...</div>;
  }

  if (!prompt) {
    return null;
  }

  return <Outlet context={{ prompt }} />;
}
