import { FormProvider, useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import { render } from "@testing-library/react";

export function renderWithForm<T extends FieldValues>({
  children,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues?: DefaultValues<T>;
}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm<T>({
      defaultValues,
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return render(children, { wrapper: Wrapper });
}
