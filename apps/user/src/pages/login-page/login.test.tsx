import { beforeEach, describe, expect, it, render, screen, userEvent, vi } from "../../utils/test-utils/render";
import { type LoginPageProps, LoginPageUI } from "../login-page/login.page";

describe("LoginPage", () => {
  let props: LoginPageProps;

  beforeEach(() => {
    props = {
      handleSubmit: vi.fn(),
      hasUser: false,
      isPending: false,
      error: null,
    };
  });

  it("renders a heading", () => {
    render(<LoginPageUI {...props} />);
    const heading = screen.getByRole("heading", { name: "Login" });
    expect(heading.textContent).toEqual("Login");
  });

  it("submits the form", async () => {
    render(<LoginPageUI {...props} />);

    const formValues = {
      email: "test@example.com",
      password: "password123",
    };

    await userEvent.type(screen.getByLabelText("Email"), formValues.email);
    await userEvent.type(screen.getByLabelText("Password"), formValues.password);
    await userEvent.click(screen.getByText("Submit"));

    expect(props.handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ type: "submit" }),
      expect.objectContaining({ data: formValues }),
    );
  });
});
