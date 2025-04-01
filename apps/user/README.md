## About

This is the primary user-facing application.

## Running

`pnpm dev`

## Notes

Layouts can be created like this:

```jsx
{
  path: ROUTES.HOME,
  element: <ProtectedRoute />,
  children: [
    {
      element: (
        <Box margin="32px">
          <Outlet />
        </Box>
      ),
      children: [
        {
          path: ROUTES.WELCOME,
          element: <WelcomePage />,
        },
        {
          path: ROUTES.ABOUT,
          element: <AboutPage />,
        },
      ],
    },
  ],
},
```