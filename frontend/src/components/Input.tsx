import { useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

type Props = {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
};

function Input({ name, type, label, placeholder, multiline, rows }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const allErrors: string[] = error?.types
    ? Object.values(error.types).flat()
    : error?.message
    ? [error.message]
    : [];

  return (
    <TextField
      {...register(name)}
      sx={{ whiteSpace: "pre-line", width: "100%" }}
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      error={!!error}
      helperText={allErrors.join("\n")}
      multiline={multiline}
      rows={rows}
    />
  );
}

export default Input;
