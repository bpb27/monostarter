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

We typically only concern ourselves with rendering a component in the running application itself, which makes sense since that's the most important context to consider. But there are actually two other contexts we need to keep in mind - tests and Storybook.

Everything in the `usePageData` area of concern requires complex mocking in the testing and Storybook environments. It's hard to do and slows velocity over time. But if the entire page UI simply accepts props, and the implementation of data fetching, navigation, and shared state access occurs at a layer above, it's very easy to comprehensively test and display all component states.

This pattern helps separate the data + callbacks from the UI logic, which makes components cleaner, easier to reason about, and more reusable. A common hinderance to reusing an existing component is the presence of data fetching or a specific action that doesn't apply to the new context in which you want to use the component. To get around this, we often introduce conditionality within the component itself, which gets very complicated when working with useQuery, useMutation, and useEffect. But if we enforce that child component of a page only accept props, it becomes very easy to just pass new props without needing to introduce conditionality. And for the page itself, imagine you wanted to A/B test two different layouts - the logic is the same, but the components are presented in different formats. With a `usePageData` and `Page` wrapper, you can easily define a second `PageUI` component rather than smushing all that code into a single component, or duplicating all the page data logic.