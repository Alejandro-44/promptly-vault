import { useFormContext } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  type: string;
  name: string;
  placeholder: string;
};

function Input({ children, type, name, placeholder }: Props) {
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
        {allErrors.length > 0 && (
        <ul className="text-red-600 text-sm mt-1 pl-6 list-disc">
          {allErrors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
      </div>
  );
}

export default Input;
