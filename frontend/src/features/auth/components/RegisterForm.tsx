import {
  type RegisterFormValues,
} from "../schemas/user.schema";
import { useRegister } from "../hooks/useRegister";
import Input from "@/components/Input";
import { useResigerForm } from "../hooks/useRegisterForm";
import { FormProvider } from "react-hook-form";

const RegisterForm = () => {
  const { mutate, isSuccess, isPending, error } = useRegister();

  const methods = useResigerForm()

  const onSubmit = (data: RegisterFormValues) => {
    mutate(data);
  };
  const errorMessage =
    (error as any)?.response?.data?.detail || "Error inesperado";
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <Input type="text" name="username" placeholder="Username">
          Username
        </Input>
        <Input type="email" name="email" placeholder="Email">
          Email
        </Input>
        <Input type="password" name="password" placeholder="••••••••">
          Password
        </Input>

        <button
          type="submit"
          disabled={isPending}
          className={
            "bg-black hover:bg-gray-800 text-indigo-50 rounded-2xl h-10 px-4 py-2 cursor-pointer"
          }
        >
          {isPending ? "Loading..." : "Register"}
        </button>
      </form>

      {isSuccess && (
        <p className="text-green-600 mt-4">Successful registration</p>
      )}
      {error && <p className="text-red-600 mt-4">{errorMessage}</p>}
    </FormProvider>
  );
};

export default RegisterForm;
