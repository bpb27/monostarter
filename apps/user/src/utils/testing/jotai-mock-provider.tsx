import { type Atom, Provider as JotaiProvider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import type { ReactNode } from "react";
import { useMemo } from "react";

type AtomValues = Iterable<readonly [Atom<unknown>, unknown]>;
type MockAtom<T> = { atom: Atom<T>; value: T };

function HydrateAtoms({ atomValues, children }: { atomValues: AtomValues; children: ReactNode }) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: omit atomValues to hydrate only once
  const memoizedAtomValues = useMemo(() => atomValues, []);
  // @ts-expect-error - The type is actually correct but TypeScript can't infer it properly
  useHydrateAtoms(memoizedAtomValues);
  return <>{children}</>;
}

export function JotaiMockProvider<T extends MockAtom<unknown>>({
  initialValues,
  children,
}: {
  initialValues: T[];
  children: ReactNode;
}) {
  const atomPairs: AtomValues = initialValues.map(({ atom, value }) => [atom, value]);
  return (
    <JotaiProvider>
      <HydrateAtoms atomValues={atomPairs}>{children}</HydrateAtoms>
    </JotaiProvider>
  );
}
