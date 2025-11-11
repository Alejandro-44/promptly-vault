import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/user.schema";
import { useRegister } from "../hooks/useRegister";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/common/Input";

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
      <div className="max-w-md mx-auto p-4 border rounded-lg">
        <h1 className="text-xl mb-4 font-semibold">Registro</h1>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input type="text" name="username" placeholder="Username">
            Username
          </Input>
          <Input type="email" name="email" placeholder="Email">
            Email
          </Input>
          <Input type="password" name="password" placeholder="Password">
            Password
          </Input>

          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white p-2 rounded"
          >
            {isPending ? "Loading..." : "Register"}
          </button>
        </form>

        {isSuccess && <p className="text-green-600 mt-4">Successful registration</p>}
        {error && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </div>
    </FormProvider>
  );
}
