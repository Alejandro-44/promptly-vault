import { useEffect } from "react";
import { useNavigate } from "react-router";

type RedirectionOnProps = {
  when: boolean;
  to: string;
  replace?: boolean;
}

export function useRedirectOn({ when, to, replace }: RedirectionOnProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (when) {
      navigate(to, { replace });
    }
  }, [when, to, replace, navigate]);
}
