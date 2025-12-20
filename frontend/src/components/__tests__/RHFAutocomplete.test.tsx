import { renderWithForm } from "@/tests/utils/renderWithForm";
import { RHFAutocomplete } from "../RHFAutocomplete";
import { cleanup, screen } from "@testing-library/react";
import { FormValueViewer } from "@/tests/utils/FormValueViewer";
import userEvent from "@testing-library/user-event";

describe("RHFAutocomplete", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the autocomplete input", () => {
    renderWithForm({
      defaultValues: { tags: [] },
      children: (
        <>
          <RHFAutocomplete
            name="tags"
            label="Tags"
            options={[
              { id: "react", label: "React" },
              { id: "ts", label: "TypeScript" },
            ]}
          />
          <FormValueViewer />
        </>
      ),
    });
    expect(screen.getByLabelText("Tags")).toBeDefined();
  });

  it("shows options when opened", async () => {
    renderWithForm({
      defaultValues: { tags: [] },
      children: (
        <>
          <RHFAutocomplete
            name="tags"
            label="Tags"
            options={[
              { id: "react", label: "React" },
              { id: "ts", label: "TypeScript" },
            ]}
          />
          <FormValueViewer />
        </>
      ),
    });
    const user = userEvent.setup()

    await user.click(screen.getByLabelText("Tags"));

    expect(screen.getByText("React")).toBeDefined();
    expect(screen.getByText("TypeScript")).toBeDefined();
  });

  it("updates form value when selecting options", async () => {
    renderWithForm({
      defaultValues: { tags: [] },
      children: (
        <>
          <RHFAutocomplete
            multiple
            name="tags"
            label="Tags"
            options={[
              { id: "react", label: "React" },
              { id: "ts", label: "TypeScript" },
            ]}
          />
          <FormValueViewer />
        </>
      ),
    });

    const user = userEvent.setup()

    await user.click(screen.getByLabelText("Tags"));
    await user.click(screen.getByText("React"));

    const formValueElement = screen.getByTestId("form-value");
    const text = formValueElement.textContent;
    expect(text).toContain("react");
  });

  it("include multiple values", async () => {
    renderWithForm({
      defaultValues: { tags: [] },
      children: (
        <>
          <RHFAutocomplete
            multiple
            name="tags"
            label="Tags"
            options={[
              { id: "react", label: "React" },
              { id: "ts", label: "TypeScript" },
            ]}
          />
          <FormValueViewer />
        </>
      ),
    });

    const user = userEvent.setup()

    await user.click(screen.getByLabelText("Tags"));
    await user.click(screen.getByText("React"));

    await user.click(screen.getByLabelText("Tags"));
    await user.click(screen.getByText("TypeScript"));

    const formValueElement = screen.getByTestId("form-value");
    const text = formValueElement.textContent;
    expect(text).toContain("react");
    expect(text).toContain("ts");
  });
});
