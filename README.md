# Dev Interview Hub

## Project Launch
Quickly set up and start the project with:
```bash
npm install                # Install project dependencies
npm run start:dev          # Start the server and frontend in development mode
# or
npm run start:dev:vite     # Start the server and frontend using Vite in development mode
```
----

## Scripts

- `npm run start` - Launches the frontend project using the Webpack Dev Server.
- `npm run start:vite` - Launches the frontend project using Vite.
- `npm run start:dev` - Starts the frontend project with the Webpack Dev Server along with the backend.
- `npm run start:dev:vite` - Starts the frontend project with Vite along with the backend.
- `npm run start:dev:server` - Starts the backend server.
- `npm run build:prod` - Builds the project in production mode.
- `npm run build:dev` - Builds the project in development mode (non-minimized).
- `npm run lint:ts` - Runs the linter on TypeScript files.
- `npm run lint:ts:fix` - Fixes issues in TypeScript files using the linter.
- `npm run lint:scss` - Runs the linter on SCSS files.
- `npm run lint:scss:fix` - Fixes issues in SCSS files using the linter.
- `npm run test:unit` - Executes unit tests with Jest.
- `npm run test:ui` - Runs screenshot tests using Loki.
- `npm run test:ui:ok` - Confirms new screenshots.
- `npm run test:ui:ci` - Runs screenshot tests in Continuous Integration (CI) mode.
- `npm run test:ui:report` - Generates a comprehensive report for screenshot tests.
- `npm run test:ui:json` - Generates a JSON report for screenshot tests.
- `npm run test:ui:html` - Generates an HTML report for screenshot tests.
- `npm run storybook` - Launches Storybook.
- `npm run storybook:build` - Builds the Storybook application.
- `npm run prepare` - Sets up pre-commit hooks.
- `npm run generate:slice` - Script for generating FSD slices.
----

## Project Structure

The project is developed following the **Feature-Sliced Design** methodology.

For a deeper understanding, visit the [Feature-Sliced Design documentation](https://feature-sliced.design/docs/get-started/tutorial)

### Architecture Overview
- **Frontend**: Utilizes React with TypeScript.
- **Backend**: Node.js server.
----

## Project Configuration

The project uses two build tools: **Webpack** and **Vite**.
For comprehensive configuration details, refer to the respective guides:

| **Tool**    |**Usage**                            | **Purpose**                                      | **Configuration**                           | 
|-------------|--------------------------------------------------|---------------------------------------------|--------------------------------------|
| [Webpack](./docs/config/README.webpack.md) | `npm run start`                       | Versatile build tool for various environments. | [webpack.config.ts](./webpack.config.ts)    | `npm run start`                       | 
| [Vite](./docs/config/README.vite.md)      | `npm run start:vite`                  | Alternative build tool with faster processes.  | [vite.config.ts](./vite.config.ts)          | 

All configuration files are systematically organized within the `/config` directory:
- [Babel configuration](./config/babel/README.md)
- [Webpack configuration](./config/build/README.webpack.md)
- [Jest configuration](./config/jest/README.md)
- [Storybook configuration](./config/storybook/README.storybook.md)

For comprehensive configuration details, refer to the [Project Configuration Documentation](./config/README.configs.md).

## Working with Translations

This project employs the [i18next](https://react.i18next.com/) library for translations. 
Translation files are located in the `public/locales` directory.
For an efficient workflow, it is recommended to install the i18next plugin for WebStorm or VSCode, which provides helpful features like autocompletion for translation keys and detecting missing translations.

For more details refer to the [configuration file](./src/shared/config/i18n/i18n.ts).

----

## Additional scripts for development
The `scripts` folder houses various utilities designed to streamline development processes, enhance code quality, and maintain project integrity.

| Script Name                                                                                                   | Purpose                                                                                                                    | Command                                                           |
|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| [Update Absolute Imports with Alias](./scripts/refactoring/updateImports/README.updateimports.md)             | Automates modification of absolute import paths in TypeScript projects by prefixing specific "layers" (`app`, `shared`, `entities`, etc.) with `@/`. <br/>Ensures a consistent import structure across the project for improved organization and maintainability. | `npm run update-absolute-import`                                  |
| [Create Public API for Shared UI](./scripts/refactoring/createPublicApiForSharedUi/README.sharedPublicApi.md) | Generates `index.ts` files for UI component directories in `src/shared/ui/`, standardizing import paths and simplifying component references. | `npm run create-publicApi-for-shared-ui`                          |
| [Remove Feature Toggles](./scripts/remove-feature/README.removeFeature.md)                                    | Automates removal of feature toggles in TypeScript projects based on specified state (`on` or `off`), ensuring deprecated features are cleanly removed from the codebase. | `npx ts-node ./scripts/remove-feature.ts featureName featureState` |
| [Generate Loki Report](./scripts/generate-loki-report/README.visualLokiReport.md)                             | Generates a `report.json` for visual regression testing with Loki, facilitating comparison of component changes visually to maintain UI quality. | `npm run test:ui:json`                                            |
| [Generate FSD Slice](./scripts/createSlice/README.createSlice.md)                                             | Automates creation of Redux slices in TypeScript projects, including directory structure, model files, UI components, and public API, enhancing consistency and reducing development time. | `node scripts/createSlice/generate-fsd-slice.js layer sliceName` |
| [Clear Cache](./scripts/clear-cache/README.clear-cache.md)                                                    | Clears `.cache` directory in `node_modules` to remove outdated or corrupt cache files, ensuring smooth operation of tools like Babel loader. | `node ./scripts/clear-cache/clear-cache.js`                       |

----

## CI Pipeline and Pre-commit Hooks

The configuration for **GitHub Actions** is located in [.github/workflows](./.github/workflows/README.md). 
In the CI process, all types of tests are run, the project and Storybook are built, and linting is performed.

In the pre-commit hooks, we check the project using linters, with the configuration found in [.husky](./.husky).

----

## Working with Data

Data interactions are handled using the **Redux Toolkit**.
To enhance reusability, entities are normalized with the **EntityAdapter** wherever applicable. 
In this project, it is specifically utilized to normalize the data for [articles](./src/pages/ArticlesPage/model/slices/README.md) and  [comments](./src/features/ArticleComments/model/slices/README.md) within their respective slices. 

Server requests are managed using **RTK query**, with the configuration available at  [rtkApi](./src/shared/api/firestoreApi.ts)

For asynchronous integration of reducers — ensuring they are not included in the main bundle — [DynamicModuleLoader](./src/shared/lib/components/DynamicModuleLoader/README.md) is implemented.

----

## Working with Feature Flags

Feature flags are managed through the `toggleFeatures` helper or `ToggleFeaturesComponent` component:
- [toggleFeatures](./src/shared/lib/features/lib/toggleFeatures/README.md) helper allows you to conditionally execute logic based on feature flags.
- [ToggleFeaturesComponent](./src/shared/lib/features/components/ToggleFeaturesComponent/README.md) toggles UI elements based on feature flags.

A custom ESLint plugin, <a href="https://www.npmjs.com/package/eslint-plugin-toggle-features-rule-plugin" target="_blank">eslint-plugin-toggle-features-rule-plugin</a>, is used to enforce:
- **`one-line-arrow-function`**:Ensures concise arrow functions for feature logic.
- **`component-jsx-props`**: Enforces that only JSX elements are used in feature flag props `on` and `off`.

These rules streamline feature flag management and facilitate clean removal.

### Removing Feature Flags
To automatically remove a feature flag, use the [remove-feature.ts](./scripts/remove-feature/README.removeFeature.md) script.
> [!IMPORTANT]
> Successful automatic feature flag removal relies on proper use of the custom ESLint plugin. Following its rules ensures the feature toggle logic is structured for clean, automated removal

For more details, refer to the [Working with Feature Flags documentation](./src/shared/lib/features/README.features.md)

## Linting

The project employs **ESLint** and **Stylelint** for code quality.
Custom plugins help enforce architectural principles, ensuring the following:
- **path-checker**: Prohibits absolute imports within the same module.
- **layer-imports**: Ensures proper layer usage as per the FSD architecture.
- **public-api-imports**: Allows imports only through the public API of other modules.

These rules help maintain project structure and improve code quality.

Additionally, the project features another plugin for managing feature flags, which includes:
- **one-line-arrow-function**: Enforces one-line arrow functions for on and off options in the `toggleFeatures` helper for cleaner code.
- **component-jsx-props**: Ensures only JSX elements are passed to the on and off props of `ToggleFeaturesComponent`, simplifying feature flag removal.

For a detailed look at the linting setup, see [Linting Documentation](./docs/linting/README.linting.md).

### Running Linters
- `npm run lint:ts` - Lint TypeScript files
- `npm run lint:ts:fix` - Fix TypeScript linting issues
- `npm run lint:scss` - Lint SCSS files with Stylelint
- `npm run lint:scss:fix` - Fix SCSS linting issues

----

## Layers according to FSD
For detailed architectural components and structures, refer to the following categories:

### Shared

| Common for both styles versions                             | Deprecated                                                          | Redesigned                                                          | 
|-------------------------------------------------------------|---------------------------------------------------------------------|---------------------------------------------------------------------|
| [AppImage](./src/shared/ui/common/AppImage/README.md)       | [AppLink](./src/shared/ui/deprecated/AppLink/README.md)             | [AppLink](./src/shared/ui/redesigned/AppLink/README.md)             |  
| [AppLogo](./src/shared/ui/common/AppLogo/README.md)         | [Avatar](./src/shared/ui/deprecated/Avatar/README.md)               | [Avatar](./src/shared/ui/redesigned/Avatar/README.md)               |
| [Drawer](./src/shared/ui/common/Drawer/README.md)           | [Button](./src/shared/ui/deprecated/Button/README.md)               | [Button](./src/shared/ui/redesigned/Button/README.md)               |
| [Modal](./src/shared/ui/common/Modal/README.md)             | [Card](./src/shared/ui/deprecated/Card/README.md)                   | [Card](./src/shared/ui/redesigned/Card/README.md)                   |
| [Overlay](./src/shared/ui/common/Overlay/README.md)         | [Code](./src/shared/ui/deprecated/Code/README.md)                   | [Code](./src/shared/ui/redesigned/Code/README.md)                   |
| [Portal](./src/shared/ui/common/Portal/README.md)           | [Icon](./src/shared/ui/deprecated/Icon/README.md)                   | [Icon](./src/shared/ui/redesigned/Icon/README.md)                   |
| [Flex](./src/shared/ui/common/Stack/Flex/README.md)         | [Input](./src/shared/ui/deprecated/Input/README.md)                 | [Input](./src/shared/ui/redesigned/Input/README.md)                 |
| [HStack](./src/shared/ui/common/Stack/HStack/README.md)     | [Skeleton](./src/shared/ui/deprecated/Skeleton/README.md)           | [Skeleton](./src/shared/ui/redesigned/Skeleton/README.md)           |
| [VStack](./src/shared/ui/common/Stack/VStack/README.md)     | [Tabs](./src/shared/ui/deprecated/Tabs/README.md)                   | [Tabs](./src/shared/ui/redesigned/Tabs/README.md)                   |
| [StarRating](./src/shared/ui/common/StarRating/README.md)   | [Text](./src/shared/ui/deprecated/Text/README.md)                   | [Text](./src/shared/ui/redesigned/Text/README.md)                   |
|                                                             | [Dropdown](./src/shared/ui/deprecated/Popups/ui/Dropdown/README.md) | [Dropdown](./src/shared/ui/redesigned/Popups/ui/Dropdown/README.md) |
|                                                             | [ListBox](./src/shared/ui/deprecated/Popups/ui/ListBox/README.md)   | [ListBox](./src/shared/ui/redesigned/Popups/ui/ListBox/README.md)                    |
|                                                             | [Popover](./src/shared/ui/deprecated/Popups/ui/Popover/README.md)   | [Popover](./src/shared/ui/redesigned/Popups/ui/Popover/README.md)                    |
|                                                             | [Loader](./src/shared/ui/deprecated/Loader/README.md)               |                  |
|                                                             | [Select](./src/shared/ui/deprecated/Select/README.md)               |                  |

### Entities

- [Article](./src/entities/Article/README.md)
- [Comment](./src/entities/Comment/README.md)
- [Country](./src/entities/Country/README.md)
- [Currency](./src/entities/Currency/README.md)
- [Notification](./src/entities/Notification/README.md)
- [Profile](./src/entities/Profile/README.md)
- [Rating](./src/entities/Rating/README.md)
- [User](./src/entities/User/README.md)

### Features
- [ArticleCategoryTabs](src/features/ArticleCategoryTabs/ui/ArticleCategoryTabs/README.md)
- [ArticleComments](src/features/ArticleComments/README.md)
- [ArticleEditNavigationButton](src/features/ArticleEditNavigationButton/ui/ArticleEditNavigationButton/README.md)
- [ArticleListNavigationButton](src/features/ArticleListNavigationButton/ui/ArticleListNavigationButton/README.md)
- [ArticlePageGreeting](src/features/ArticlePageGreeting/ui/ArticlePageGreeting/README.md)
- [ArticleRating](src/features/ArticleRating/ui/ArticleRating/README.md)
- [ArticleRecommendationsList](src/features/ArticleRecommendationsList/ui/ArticleRecommendationsList/README.md)
- [ArticleSortSelector](src/features/ArticleSortSelector/ui/ArticleSortSelector/README.md)
- [ArticleViewSelector](src/features/ArticleViewSelector/ui/ArticleViewSelector/README.md)
- [AuthByUsername](src/features/AuthUser/README.md)
- [AvatarDropdown](src/features/AvatarDropdown/ui/AvatarDropdown/README.md)
- [EditableProfileCard](src/features/EditableProfileCard/README.md)
- [LangSwitcher](src/features/LangSwitcher/ui/LangSwitcher/README.md)
- [NotificationButton](src/features/NotificationButton/ui/NotificationButton/README.md)
- [ScrollToTopButton](src/features/ScrollToTopButton/ui/ScrollToTopButton/README.md)
- [ThemeSwitcher](src/features/ThemeSwitcher/ui/ThemeSwitcher/README.md)
- [UIDesignSwitcher](src/features/UIDesignSwitcher/ui/UiDesignSwitcher/README.md)

### Widgets 
- [ArticleAdditionalInfo](src/widgets/ArticleAdditionalInfo/README.md)
- [ArticlesFilters](src/widgets/ArticlesFilters/README.md)
- [Navbar](src/widgets/Navbar/README.md)
- [Page](src/widgets/Page/README.md)
- [PageError](src/widgets/PageError/README.md)
- [PageLoader](src/widgets/PageLoader/README.md)
- [ScrollToolbar](src/widgets/ScrollToolbar/README.md)
- [Sidebar](src/widgets/Sidebar/README.md)

### Pages
- [AboutPage](src/pages/AboutPage/README.md)
- [AdminPanelPage](src/pages/AdminPanelPage/README.md)
- [ArticleDetailsPage](src/pages/ArticleDetailsPage/ui/ArticleDetailsPage/README.md)
- [ArticleEditPage](src/pages/ArticleEditPage/README.md)
- [ArticlesPage](src/pages/ArticlesPage/README.md)
- [ForbiddenPage](src/pages/ForbiddenPage/ui/README.md)
- [MainPage](src/pages/MainPage/README.md)
- [NotFoundPage](src/pages/NotFoundPage/ui/README.md)
- [ProfilePage](src/pages/ProfilePage/ui/ProfilePage/README.md)
- [SettingsPage](src/pages/SettingsPage/README.md)

----

## Testing

The project supports multiple test types. See the full testing documentation here:

| Test Type                        | Command                   | Description                                            |
|----------------------------------|---------------------------|--------------------------------------------------------|
| **Unit Tests (Jest)**            | `npm run test:unit`      | Verifies core functionality and ensures functions operate as intended. |
| **Component Tests (React Testing Library)** | `npm run test:unit`      | Assesses the behavior and rendering of React components. |
| **Screenshot Tests (Loki)**      | `npm run test:ui`        | Conducts visual regression testing to maintain UI consistency. |
| **End-to-End Tests (Cypress)**   | `npm run test:e2e`       | Tests comprehensive user flows and interactions.       |

For more details, refer to the [tests documentation](./docs/tests.md)

----

## Storybook

- Each component in the project has corresponding story cases defined for it.
- Server requests are mocked using the `storybook-addon-mock` plugin to simulate API interactions.
- Story files are created alongside the component files with the `.stories.tsx` extension.

You can run Storybook with the following command:

```bash 
npm run storybook
```
For more details, see the  [Storybook documentation](/docs/storybook.md)

----
