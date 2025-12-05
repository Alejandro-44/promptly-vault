import { Alert, Button, Stack } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { CircleXIcon } from "lucide-react";

import Input from "@/components/Input";
import { useLoginForm } from "../hooks/useLoginForm";
import { useLogin } from "../hooks/useLogin";
import type { LoginFormValues } from "../schemas/login.schema";

const LoginForm = () => {
  const { mutate, isPending, error } = useLogin();
  const methods = useLoginForm();

  const onSubmit = methods.handleSubmit((data: LoginFormValues) => {
    mutate(data);
    methods.reset();
  });

  const errorMessage =
    (error as any)?.response?.data?.detail || "Error inesperado";

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
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
          <Button type="submit" disabled={isPending} variant="contained">
            {isPending ? "Loading..." : "Log In"}
          </Button>
          {error && (
            <Alert icon={<CircleXIcon />} severity="error">
              {errorMessage}
            </Alert>
          )}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
