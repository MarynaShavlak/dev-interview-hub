# Linting

The project uses **ESLint** for checking TypeScript code and **Stylelint** for style files.

Additionally, to strictly enforce core architectural principles, a custom ESLint plugin, <a href="https://www.npmjs.com/package/eslint-plugin-ms-production-project-plugin" target="_blank">ms-production-project-plugin</a>, is used. This plugin includes three key rules:
1. **path-checker**: Prohibits the use of absolute imports within the same module._**Includes auto-fix functionality**_.
2. **layer-imports**: Ensures proper layer usage according to the FSD architecture (e.g., widgets cannot be used in features or entities).
3. **public-api-imports**: Allows imports from other modules only through their public API. _**Includes auto-fix functionality**_.

Furthermore, the project includes another custom plugin, <a href="https://www.npmjs.com/package/eslint-plugin-toggle-features" target="_blank">eslint-plugin-toggle-features</a>, which supports feature flag management with the following two rules:
1. **one-line-arrow-function**: Enforces one-line arrow functions for `on` and `off` options in the `toggleFeatures` helper to maintain clean and concise code.
2. **component-jsx-props**: Ensures that only JSX elements are passed directly to the `on` and `off` props of the `ToggleFeaturesComponent`, preventing the use of variables and making feature flag removal easier.

Both plugins help maintain the project's code quality and consistency, while also supporting the automated removal of feature flags.

## Running Linters
- `npm run lint:ts` - Lint TypeScript files
- `npm run lint:ts:fix` - Fix TypeScript linting issues
- `npm run lint:scss` - Lint SCSS files with Stylelint
- `npm run lint:scss:fix` - Fix SCSS linting issues
