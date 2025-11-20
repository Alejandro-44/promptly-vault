import Input from "@/components/Input";
import { useLoginForm } from "../hooks/useLoginForm";
import { FormProvider } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import type { LoginFormValues } from "../schemas/login.schema";

const LoginForm = () => {
  const { mutate, isPending, error } = useLogin();
  const methods = useLoginForm();

  const onSubmit = methods.handleSubmit((data: LoginFormValues) => {
    mutate(data);
  });

  const errorMessage =
    (error as any)?.response?.data?.detail || "Error inesperado";

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Input type="email" name="email" placeholder="youremail@example.com">
          Email
        </Input>
        <Input type="password" name="password" placeholder="••••••••">
          Password
        </Input>
        <button disabled={isPending} type="submit" className="bg-black hover:bg-gray-800 text-indigo-50 rounded-2xl h-10 px-4 py-2 cursor-pointer">
          {isPending ? "Loading..." : "Log In"}
        </button>
        {error && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </form>
    </FormProvider>
  );
};

export default LoginForm;
