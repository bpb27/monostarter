import type { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import type { ClientRoute } from "../../core/router";

export const NAVIGATED_AWAY = "Navigated away";

export function RouterMockProvider({ route, children }: { route: ClientRoute; children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={route} element={children} />
        <Route path="*" element={<span>{NAVIGATED_AWAY}</span>} />
      </Routes>
    </MemoryRouter>
  );
}
