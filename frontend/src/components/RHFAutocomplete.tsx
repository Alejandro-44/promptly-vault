import { Autocomplete, TextField } from "@mui/material";
import {
  useController,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

type Option = {
  id: string;
  label: string;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
  label?: string;
  multiple?: boolean;
};

export function RHFAutocomplete<T extends FieldValues>({
  name,
  options,
  label,
  multiple = false,
}: Props<T>) {
  const { control } = useFormContext<T>();

  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      value={
        multiple
          ? options.filter((opt) => value?.includes(opt.id))
          : options.find((opt) => opt.id === value) ?? null
      }
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, newValue) => {
        if (Array.isArray(newValue)) {
          onChange(newValue?.map((opt: Option) => opt.id));
        } else {
          onChange(newValue ? newValue.id : null);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputRef={ref}
          error={!!error}
          helperText={error?.message}
          fullWidth
        />
      )}
    />
  );
}
