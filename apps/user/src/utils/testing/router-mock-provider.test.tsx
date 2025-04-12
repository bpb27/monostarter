import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useLocation, useNavigate } from "react-router";
import { describe, test } from "vitest";
import { ROUTES } from "~/core/routes";
import { RouterMockProvider } from "./router-mock-provider";

describe("RouterMockProvider", () => {
  test("renders with initial route", () => {
    const TestComponent = () => {
      const location = useLocation();
      return <div>Current path: {location.pathname}</div>;
    };

    render(
      <RouterMockProvider route={ROUTES.WELCOME}>
        <TestComponent />
      </RouterMockProvider>,
    );

    screen.getByText("Current path: /welcome");
  });

  test("navigation works", async () => {
    const TestComponent = () => {
      const navigate = useNavigate();

      return (
        <div>
          <button type="button" onClick={() => navigate(ROUTES.ABOUT)}>
            Go to About
          </button>
        </div>
      );
    };

    render(
      <RouterMockProvider route={ROUTES.WELCOME}>
        <TestComponent />
      </RouterMockProvider>,
    );

    await userEvent.click(screen.getByText("Go to About"));

    screen.getByText("Navigated away");
  });
});
