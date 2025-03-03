This package is solely for sharing API types from the BFF app.
This package will be consumed by the FE apps.

Apps shouldn't ever be a dependency of another app or package.
That breaks the rules of a monorepo.

However since the FE _is_ dependent on the API types, we can either:
1. Define the API separately in a package (annoying)
2. Sync the API types into this package and have the FE consume them (less annoying)