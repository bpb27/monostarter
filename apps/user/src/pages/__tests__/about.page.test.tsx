import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { AboutPage } from "../about.page";

describe("AboutPage", () => {
	it("renders a heading", () => {
		render(<AboutPage />);
		screen.getByRole("heading", { name: "About" });
	});
});
