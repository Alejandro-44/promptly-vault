import type { PromptCreate } from "@/services";

function areTagsEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  return a.every((tag, index) => tag === b[index]);
}

export function getPromptChanges(
  original: PromptCreate,
  current: PromptCreate
): Partial<PromptCreate> {
  const changes: Partial<PromptCreate> = {};

  if (original.title !== current.title) {
    changes.title = current.title;
  }

  if (original.prompt !== current.prompt) {
    changes.prompt = current.prompt;
  }

  if (original.resultExample !== current.resultExample) {
    changes.resultExample = current.resultExample;
  }

  if (original.model !== current.model) {
    changes.model = current.model;
  }

  if (!areTagsEqual(original.tags, current.tags)) {
    changes.tags = current.tags;
  }

  return changes;
}
