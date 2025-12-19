import { Alert, Button, Stack } from "@mui/material";
import { CircleXIcon } from "lucide-react";
import { FormProvider } from "react-hook-form";

import Input from "@/components/Input";
import { useRegisterForm, useRegister } from "../hooks";
import type { RegisterFormValues } from "../schemas/register.schema";

const RegisterForm = () => {
  const { mutate, isPending, error } = useRegister();
  const methods = useRegisterForm();
  const onSubmit = methods.handleSubmit((data: RegisterFormValues) => {
    mutate(data);
  });
  const errorMessage =
    (error as any)?.response?.data?.detail || "Error inesperado";
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <Input name="username" label="Username" placeholder="Username" />
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="youremail@example.com"
          />
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="••••••••"
          />
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? "Loading..." : "Register"}
          </Button>
          {error && <Alert icon={<CircleXIcon />} severity="error">{errorMessage}</Alert>}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
