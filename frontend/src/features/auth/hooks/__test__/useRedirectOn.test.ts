import { useRedirectOn } from "../useRedirectOn";
import { renderHookWithClient } from "@/tests/utils/renderHookWithClient";

const navigateMock = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual<any>("react-router");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("useRedirectOn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not call navigate when when is false", () => {
    renderHookWithClient(() =>
      useRedirectOn({ when: false, to: "/some-path" })
    );

    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("should call navigate with to and replace undefined when when is true and replace is not provided", () => {
    renderHookWithClient(() => useRedirectOn({ when: true, to: "/some-path" }));

    expect(navigateMock).toHaveBeenCalledWith("/some-path", {
      replace: undefined,
    });
  });

  it("should call navigate with to and replace true when 'when' is true and replace is true", () => {
    renderHookWithClient(() =>
      useRedirectOn({ when: true, to: "/some-path", replace: true })
    );

    expect(navigateMock).toHaveBeenCalledWith("/some-path", { replace: true });
  });

  it("should call navigate when when changes from false to true", () => {
    const { rerender } = renderHookWithClient(
      ({ when }) => useRedirectOn({ when, to: "/some-path" }),
      {
        initialProps: { when: false },
      }
    );

    expect(navigateMock).not.toHaveBeenCalled();

    rerender({ when: true });

    expect(navigateMock).toHaveBeenCalledOnce();
  });

  it("should call navigate again when to changes", () => {
    const { rerender } = renderHookWithClient(
      ({ to }) => useRedirectOn({ when: true, to }),
      {
        initialProps: { to: "/initial-path" },
      }
    );

    expect(navigateMock).toHaveBeenCalledWith("/initial-path", {
      replace: undefined,
    });

    navigateMock.mockClear();

    rerender({ to: "/new-path" });

    expect(navigateMock).toHaveBeenCalledWith("/new-path", {
      replace: undefined,
    });
  });
});
