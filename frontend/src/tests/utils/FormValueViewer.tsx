import { useFormContext } from "react-hook-form";

export const FormValueViewer = () => {
  const { watch } = useFormContext();
  return (
    <div data-testid="form-value">
      {JSON.stringify(watch("tags"))}
    </div>
  );
};
