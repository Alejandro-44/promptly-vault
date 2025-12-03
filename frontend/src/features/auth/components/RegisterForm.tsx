import { type RegisterFormValues } from "../schemas/register.schema";
import { useRegister } from "../hooks/useRegister";
import Input from "@/components/Input";
import { useResigerForm } from "../hooks/useRegisterForm";
import { FormProvider } from "react-hook-form";
import { Alert, Button, Stack } from "@mui/material";

const RegisterForm = () => {
  const { mutate, isSuccess, isPending, error } = useRegister();
  const methods = useResigerForm();
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
          {isSuccess && (
            <Alert severity="success">
              Here is a gentle confirmation that your action was successful.
            </Alert>
          )}
          {error && <Alert severity="error">{errorMessage}</Alert>}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
