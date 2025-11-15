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
        <label className="text-sm font-medium" htmlFor={name}>{children}</label>
        <input
          id={name}
          aria-label={name}
          placeholder={placeholder}
          type={type}
          {...register(name)}
          className="border border-gray-200 rounded w-full h-9 outline-0 p-6 text-sm placeholder:text-sm placeholder:font-medium"
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
