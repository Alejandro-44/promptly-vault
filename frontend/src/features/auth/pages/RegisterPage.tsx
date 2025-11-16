import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/user.schema";
import { useRegister } from "../hooks/useRegister";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";

export function RegisterPage() {
  const { mutate, isSuccess, isPending, error } = useRegister();

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    mutate(data);
  };
  const errorMessage =
    (error as any)?.response?.data?.detail || "Error inesperado";

  return (
    <FormProvider {...methods}>
      <div className="flex align-middle justify-center h-dvh">
        <div className="w-full max-w-md shadow-lg rounded-2xl border border-gray-200 p-6 m-auto">
          <h1 className="text-xl mb-4 font-semibold text-center">Register</h1>

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
              className={"bg-black hover:bg-gray-800 text-indigo-50 rounded-2xl h-10 px-4 py-2 cursor-pointer"}
            >
              {isPending ? "Loading..." : "Register"}
            </button>
          </form>

          {isSuccess && (
            <p className="text-green-600 mt-4">Successful registration</p>
          )}
          {error && <p className="text-red-600 mt-4">{errorMessage}</p>}
        </div>
      </div>
    </FormProvider>
  );
}
