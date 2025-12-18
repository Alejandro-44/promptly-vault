import { renderWithForm } from "@/tests/utils/renderWithForm";
import { RHFAutocomplete } from "../RHFAutocomplete";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import { FormValueViewer } from "@/tests/utils/FormValueViewer";

describe("RHFAutocomplete", () => {
  beforeEach(() => {
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
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the autocomplete input", () => {
    expect(screen.getByLabelText("Tags")).toBeDefined();
  });

  it("shows options when opened", () => {
    fireEvent.keyDown(screen.getByLabelText("Tags"), { key: "ArrowDown" });
    expect(screen.getByText("React")).toBeDefined();
    expect(screen.getByText("TypeScript")).toBeDefined();
  });

  it("updates form value when selecting options", () => {
    fireEvent.keyDown(screen.getByLabelText("Tags"), { key: "ArrowDown" });
    fireEvent.click(screen.getByText("React"));

    const formValueElement = screen.getByTestId("form-value");
    const text = formValueElement.textContent;
    expect(text).toContain("react");
  });

  it("include multiple values", () => {
    fireEvent.keyDown(screen.getByLabelText("Tags"), { key: "ArrowDown" });
    fireEvent.click(screen.getByText("React"));
    fireEvent.keyDown(screen.getByLabelText("Tags"), { key: "ArrowDown" });
    fireEvent.click(screen.getByText("TypeScript"));

    const formValueElement = screen.getByTestId("form-value");
    const text = formValueElement.textContent;
    expect(text).toContain("react");
    expect(text).toContain("ts");
  });
});
