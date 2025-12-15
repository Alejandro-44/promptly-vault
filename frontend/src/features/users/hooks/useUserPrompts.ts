import { UsersService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useUserPrompts() {
  const { data: prompts } = useQuery({
    queryKey: ["myPrompts"],
    queryFn: UsersService.getMyPrompts,
  });
  return { prompts };
}
