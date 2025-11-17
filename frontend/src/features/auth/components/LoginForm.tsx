import Input from "@/components/Input";
import { useLoginForm } from "../hooks/useLoginForm";
import { FormProvider } from "react-hook-form";

const LoginForm = () => {

  const methods = useLoginForm()

  const onSubmit = methods.handleSubmit(() => {});

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Input type="email" name="email" placeholder="youremail@example.com">
          Email
        </Input>
        <Input type="password" name="password" placeholder="••••••••">
          Password
        </Input>
        <button type="submit">Log In</button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
