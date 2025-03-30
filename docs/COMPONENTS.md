Only page components should fetch data.

A page component should have three parts
 - `usePageData` hook
 - `PageUI` component
 - `Page` component (simple wrapper that calls the hook and provides the result to the UI)

What should go in a usePageData hook vs. PageUI component?

usePageData should handle all non-UI concerns
  - data fetching
  - manual navigation (as opposed to rendering links)
  - accessing stored state via Jotai atoms

PageUI should handle all UI concerns
  - the JSX markup
  - hooks that are explicitly about controlling UI like useForm, useToggle, useChecklist, etc.

Why do this?

We usually only consider rendering UI in the running application itself, but there are three places we render UI:
1. The running application
2. Unit and integration tests
3. Storybook

Everything in the `usePageData` area of concern requires complex mocking in the testing and Storybook environments. It's hard to do and slows velocity over time. But if the entire page UI simply accepts props, and the implementation of data fetching, navigation, and shared state access occurs at a layer above, it's very easy to comprehensively test and display all component states.

