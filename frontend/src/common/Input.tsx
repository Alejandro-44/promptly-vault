import { useFormContext } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  type: string;
  name: string;
  placeholder: string;
};

function Input({ children, type, name, placeholder }: Props) {
  const { register, formState, getFieldState } = useFormContext()
  const { error } = getFieldState(name, formState);
  return (
      <div>
        <label className="form-label" htmlFor={name}>{children}</label>
        <input
          id={name}
          aria-label={name}
          placeholder={placeholder}
          type={type}
          {...register(name)}
          className="border p-2 rounded w-full"
        />
        {error?.message && (
          <p className="text-red-600 text-sm mt-1">
            {error.message}
          </p>
        )}
      </div>
  );
}

export default Input;
