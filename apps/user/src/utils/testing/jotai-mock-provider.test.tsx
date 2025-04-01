import { render, screen } from "@testing-library/react";
import { atom, useAtomValue } from "jotai";
import { describe, test } from "vitest";
import { JotaiMockProvider } from "./jotai-mock-provider";

describe("JotaiMockProvider", () => {
  test("works", async () => {
    const testCountAtom = atom(100);
    const testNameAtom = atom("Bob");

    const TestComponent = () => {
      const count = useAtomValue(testCountAtom);
      const name = useAtomValue(testNameAtom);
      return (
        <div>
          {count} {name}
        </div>
      );
    };

    render(
      <JotaiMockProvider
        initialValues={[
          { atom: testCountAtom, value: 99 },
          { atom: testNameAtom, value: "Bill" },
        ]}
      >
        <TestComponent />
      </JotaiMockProvider>,
    );

    await screen.findByText("99 Bill");
  });
});
