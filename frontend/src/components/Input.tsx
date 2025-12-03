import { useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

type Props = {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
};

function Input({ name, type, label, placeholder }: Props) {
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
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      error={!!error}
      helperText={
        allErrors.length > 0 ? (
          <>
            {allErrors.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </>
        ) : undefined
      }
    />
  );
}

export default Input;
