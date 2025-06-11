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


## TypeScript Skills Summary 
[Detailed TypeScript Skills Documentation](./docs/ts/README.typescript.md)

### **Exhaustive Type Checking & Control Flow Analysis**

Implemented comprehensive type safety using `never` checks, `typeof`/`keyof` operators, and exhaustive enum coverage to create robust type systems for theme management, authentication, i18n, feature flags, and Redux state management.

### **Generic Programming & Constraint Design**

Built reusable type-safe utilities with advanced generic constraints for Firestore operations, deep object merging, Redux composition, and pagination systems while maintaining strict typing across React components.

### **Defensive Programming with Optional Chaining**

Applied optional chaining (`?.`) and non-null assertions (`!`) for safe object traversal in authentication callbacks, form validation, API responses, and build configuration overrides.

### **Advanced Type Guards & Discriminated Unions**

Created sophisticated type narrowing with built-in guards (`typeof`, `in`, `instanceof`) and custom type predicates for dynamic component rendering and exhaustive pattern matching.

### **Runtime Assertion & Type Narrowing**

Developed custom `asserts` functions like `assertExists()` for runtime type safety in async operations, Firestore queries, and authentication flows while preserving compile-time type information.

### **Strategic Type Assertions & Inference Control**

Applied precise type assertions (`as`, `as unknown as`, `satisfies`) for Redux composition, test environments, and Storybook configurations while maintaining autocomplete and type compliance.

### **Utility Type Composition**

Leveraged built-in utility types (`Partial`, `Omit`, `Pick`, `Record`, `ReturnType`) for flexible API payload generation, configuration objects, and type-safe key-value mappings.

### **Conditional Type Extraction with `infer`**

Utilized `infer` keyword for sophisticated type extraction from Redux middleware generics, maintaining accurate typing across complex store configurations while following DRY principles.

### **Recursive & Mapped Type Utilities**

Developed complex utility types like `DeepPartial<T>` and mapped types for deep object manipulation while preserving type relationships and compile-time safety.

###  **Enum & Constant Type Design**

Structured application constants using `enum` declarations and `as const` objects for type-safe route management, user roles, and configuration schemas with IDE autocomplete support.

### **Type-Driven Development Patterns**

Adopted type-first approaches where TypeScript drives API design and component architecture, creating self-documenting code that encodes business logic directly in type definitions.

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

## Service Worker

The **Service Worker** is implemented to enhance performance, provide offline capabilities, and improve caching strategies.

- The Service Worker file is located in [`config/serviceWorker/config-sw.js`](config/serviceWorker/config-sw.js).
- It caches static assets, API responses, and other critical resources to improve load times and support offline functionality.
- The implementation follows best practices, ensuring updates are handled correctly using versioning and the `skipWaiting` strategy.
- The registration logic is managed in [`config/serviceWorker/serviceWorkerRegistration.js`](config/serviceWorker/serviceWorkerRegistration.js).

For debugging or testing, the Service Worker can be manually unregistered using the browser's developer tools.

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

A custom ESLint plugin, <a href="https://www.npmjs.com/package/eslint-plugin-toggle-features" target="_blank">eslint-plugin-toggle-features</a>, is used to enforce:
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

| Common for both styles versions                                                                           | Deprecated                                                                           | Redesigned                                                                           |
|-----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [AddNewArticleButton](@/shared/ui/common/AddNewEntityButton/AddNewEntityButton.tsx)                 | [ActionButtonList](./src/shared/ui/deprecated/ActionButtonList/ActionButtonList.tsx) | [ActionButtonList](./src/shared/ui/redesigned/ActionButtonList/ActionButtonList.tsx) |
| [AppImage](./src/shared/ui/common/AppImage/README.md)                                                     | [AppLink](./src/shared/ui/deprecated/AppLink/README.md)                              | [AppLink](./src/shared/ui/redesigned/AppLink/README.md)                              |
| [AppLogo](./src/shared/ui/common/AppLogo/README.md)                                                       | [Avatar](./src/shared/ui/deprecated/Avatar/README.md)                                | [Avatar](./src/shared/ui/redesigned/Avatar/README.md)                                |
| [Box](./src/shared/ui/common/Box/Box.tsx)                                                                 | [Button](./src/shared/ui/deprecated/Button/README.md)                                | [Button](./src/shared/ui/redesigned/Button/README.md)                                |
| [CodeEditor](./src/shared/ui/common/CodeEditor/CodeEditor.tsx)                                            | [Card](./src/shared/ui/deprecated/Card/README.md)                                    | [Card](./src/shared/ui/redesigned/Card/README.md)                                    |
| [ConfirmCancelModal](./src/shared/ui/common/ConfirmCancelModal/ConfirmCancelModal/ConfirmCancelModal.tsx) | [Code](./src/shared/ui/deprecated/Code/README.md)                                    | [Code](./src/shared/ui/redesigned/Code/README.md)                                    |
| [ConfirmDeleteModal](./src/shared/ui/common/ConfirmDeleteModal/ConfirmDeleteModal/ConfirmDeleteModal.tsx) | [Dropdown](./src/shared/ui/deprecated/Popups/ui/Dropdown/README.md)                  | [Dropdown](./src/shared/ui/redesigned/Popups/ui/Dropdown/README.md)                  |
| [Drawer](./src/shared/ui/common/Drawer/README.md)                                                         | [FileUploadZone](./src/shared/ui/deprecated/FileUploadZone/FileUploadZone.tsx)       | [FileUploadZone](./src/shared/ui/redesigned/FileUploadZone/FileUploadZone.tsx)       |
| [FileUploadInput](./src/shared/ui/common/FileUploadInput/FileUploadInput.tsx)                             | [Icon](./src/shared/ui/deprecated/Icon/README.md)                                    | [Icon](./src/shared/ui/redesigned/Icon/README.md)                                    |
| [Flex](./src/shared/ui/common/Stack/Flex/README.md)                                                       | [Input](./src/shared/ui/deprecated/Input/README.md)                                  | [Input](./src/shared/ui/redesigned/Input/README.md)                                  |
| [HStack](./src/shared/ui/common/Stack/HStack/README.md)                                                   | [ListBox](./src/shared/ui/deprecated/Popups/ui/ListBox/README.md)                    | [ListBox](./src/shared/ui/redesigned/Popups/ui/ListBox/README.md)                    |
| [ImageModal](./src/shared/ui/common/ImageModal/ImageModal/ImageModal.tsx)                                 | [Loader](./src/shared/ui/deprecated/Loader/README.md)                                |                                                                                      |
| [List](./src/shared/ui/common/List/List.tsx)                                                              | [OrderCard](./src/shared/ui/deprecated/OrderCard/OrderCard.tsx)                      | [OrderCard](./src/shared/ui/redesigned/OrderCard/OrderCard.tsx)                      |
| [MarkupHTMLCreator](./src/shared/ui/common/MarkupHTMLCreator/MarkupHTMLCreator.tsx)                       | [Popover](./src/shared/ui/deprecated/Popups/ui/Popover/README.md)                    | [Popover](./src/shared/ui/redesigned/Popups/ui/Popover/README.md)                    |
| [Modal](./src/shared/ui/common/Modal/README.md)                                                           | [Select](./src/shared/ui/deprecated/Select/README.md)                                |                                                                                      |
| [Overlay](./src/shared/ui/common/Overlay/README.md)                                                       | [Skeleton](./src/shared/ui/deprecated/Skeleton/README.md)                            | [Skeleton](./src/shared/ui/redesigned/Skeleton/README.md)                            |
| [Portal](./src/shared/ui/common/Portal/README.md)                                                         | [Tabs](./src/shared/ui/deprecated/Tabs/README.md)                                    | [Tabs](./src/shared/ui/redesigned/Tabs/README.md)                                    |
| [StarRating](./src/shared/ui/common/StarRating/README.md)                                                 | [Text](./src/shared/ui/deprecated/Text/README.md)                                    | [Text](./src/shared/ui/redesigned/Text/README.md)                                    |
| [ValidationErrorMessages](./src/shared/ui/common/ValidationErrorMessages/ValidationErrorMessages.tsx)     |                                                                                      |                                                                                      |
| [VStack](./src/shared/ui/common/Stack/VStack/README.md)                                                   |                                                                                      |                                                                                      |

**Chart Components**

| Chart Component                                                                                           | Chart Component                                                                                           |
|-----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| [BarChart](./src/shared/ui/common/Charts/ui/BarChart/BarChart.tsx)                                        | [PieChart](./src/shared/ui/common/Charts/ui/PieChart/BarChart.tsx)                                        |
| [BubbleChart](./src/shared/ui/common/Charts/ui/BubbleChart/BubbleChart.tsx)                               | [RadialbarChart](./src/shared/ui/common/Charts/ui/RadialbarChart/RadialbarChart.tsx)                      |
| [LineChart](./src/shared/ui/common/Charts/ui/LineChart/LineChart.tsx)                                     | [StackedColumnsChart](./src/shared/ui/common/Charts/ui/StackedColumnsChart/StackedColumnsChart.tsx)       |
| [NoDataChart](./src/shared/ui/common/Charts/NoDataChart/NoDataChart.tsx)                                  | [TreemapChart](./src/shared/ui/common/Charts/ui/TreemapChart/TreemapChart.tsx)                            |


### Entities

|                       |                           |                          |
|--------------------------------|------------------------------------|-----------------------------------|
| [Article](./src/entities/Article/README.md)     | [Notification](./src/entities/Notification/README.md) | [Rating](./src/entities/Rating/README.md)     |
| [Comment](./src/entities/Comment/README.md)     | [Question](./src/entities/Question/README.md)         | [User](./src/entities/User/README.md)         |
| [Country](./src/entities/Country/README.md)     | [Profile](./src/entities/Profile/README.md)           | [Currency](./src/entities/Currency/README.md) |


### Features

|                                                                                                                              |                                                                                                                               |                                                                                                                                  |
|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| [ArticleCategoryTabs](src/features/ArticleCategoryTabs/ui/ArticleCategoryTabs/README.md)                                                 | [EditableProfileCard](src/features/EditableProfileCard/README.md)                                                                       | [DashboardStats.tsx](src/features/DashboardStats/ui/DashboardStats/DashboardStats.tsx)                                                  |
| [ArticleComments](src/features/ArticleComments/README.md)                                                                                | [LangSwitcher](src/features/LangSwitcher/ui/LangSwitcher/README.md)                                                                     | [ArticleCategoriesCharts](src/features/ArticleCategoriesCharts/ui/ArticleCategoriesCharts/ArticleCategoriesCharts.tsx)                   |
| [ArticleEditNavigationButton](src/features/ArticleEditNavigationButton/ui/ArticleEditNavigationButton/README.md)                        | [NotificationButton](src/features/NotificationButton/ui/NotificationButton/README.md)                                                   | [ArticleCommentersChart](src/features/ArticleCommentersChart/ui/ArticleCommentersChart/ArticleCommentersChart.tsx)                       |
| [ArticleListNavigationButton](src/features/ArticleListNavigationButton/ui/ArticleListNavigationButton/README.md)                        | [ScrollToTopButton](src/features/ScrollToTopButton/ui/ScrollToTopButton/README.md)                                                       | [ArticleMonthlyDataChart.tsx](src/features/ArticleMonthlyDataChart/ui/ArticleMonthlyDataChart/ArticleMonthlyDataChart.tsx)               |
| [ArticlePageGreeting](src/features/ArticlePageGreeting/ui/ArticlePageGreeting/README.md)                                                | [ThemeSwitcher](src/features/ThemeSwitcher/ui/ThemeSwitcher/README.md)                                                                   | [ArticleQuarterlyDataChart.tsx](src/features/ArticleQuarterlyDataChart/ui/ArticleQuarterlyDataChart/ArticleQuarterlyDataChart.tsx)       |
| [ArticleRating](src/features/ArticleRating/ui/ArticleRating/README.md)                                                                  | [UIDesignSwitcher](src/features/UIDesignSwitcher/ui/UiDesignSwitcher/README.md)                                                         | [TopCommentedArticlesChart.tsx](src/features/TopCommentedArticlesChart/ui/TopCommentedArticlesChart/TopCommentedArticlesChart.tsx)       |
| [ArticleRecommendationsList](src/features/ArticleRecommendationsList/ui/ArticleRecommendationsList/README.md)                          | [QuestionsQueue.tsx](src/features/QuestionsQueue/ui/QuestionsQueue.tsx)                                                                  | [ArticleRatingDistributionChart.tsx](src/features/ArticleRatingDistributionChart/ui/ArticleRatingDistributionChart/ArticleRatingDistributionChart.tsx) |
| [ArticleSortSelector](src/features/ArticleSortSelector/ui/ArticleSortSelector/README.md)                                                | [Table](src/features/Table/index.ts)                                                                                                     | [UserRatingsBubbleChart.tsx](src/features/UserRatingsBubbleChart/ui/UserRatingsBubbleChart/UserRatingsBubbleChart.tsx)                   |
| [ArticleViewSelector](src/features/ArticleViewSelector/ui/ArticleViewSelector/README.md)                                                | [CodeEditorForm.tsx](src/features/CodeEditorForm/ui/CodeEditorForm/CodeEditorForm.tsx)                                                   | [UsersActivityChart.tsx](src/features/UsersActivityChart/ui/UsersActivityChart/UsersActivityChart.tsx)                                   |
| [AuthUser](src/features/AuthUser/README.md)                                                                                              | [ImageEditorForm.tsx](src/features/ImageEditorForm/ui/ImageEditorForm/ImageEditorForm.tsx)                                               |                                                                                                                                          |
| [AvatarDropdown](src/features/AvatarDropdown/ui/AvatarDropdown/README.md)                                                               | [TextEditorForm.tsx](src/features/TextEditorForm/ui/TextEditorForm/TextEditorForm.tsx)                                                   |                                                                                                                                          |




### Widgets 


|                                                                 |                                                                                                                              |                                                                                                                                                                                          |
|--------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [ArticleControls](src/widgets/ArticleControls/ui/ArticleControls.tsx)   | [ImageBlockEditor](src/widgets/ImageBlockEditor/ui/ImageBlockEditor/ImageBlockEditor.tsx)                                    | [PageLoader](src/widgets/PageLoader/README.md)                                                                                                                                           |
| [ArticleManagement](src/widgets/ArticleManagement/index.ts)             | [TextBlockEditor](src/widgets/TextBlockEditor/ui/TextBlockEditor/TextBlockEditor.tsx)                                        | [ScrollToolbar](src/widgets/ScrollToolbar/README.md)                                                                                                                                     |
| [ArticlesFilters](src/widgets/ArticlesFilters/README.md)                | [CodeBlockEditor](src/widgets/CodeBlockEditor/ui/CodeBlockEditor/CodeBlockEditor.tsx)  |          [StatisticsCharts](src/widgets/StatisticsCharts/ui/StatisticsCharts/StatisticsCharts.tsx)                                                                                                                                                                               |
| [Page](src/widgets/Page/README.md)   |                                        [Navbar](src/widgets/Navbar/README.md)                                                  | [UserArticlesTable](src/widgets/UserArticlesTable/ui/UserArticlesTable/UserArticlesTable.tsx)   |
| [PageError](src/widgets/PageError/README.md)                            |       [Sidebar](src/widgets/Sidebar/README.md)                        | [UsersFullInfoTable](src/widgets/UsersFullInfoTable/ui/UsersFullInfoTable/UsersFullInfoTable.tsx)                                                                                        |



### Pages

|                                                                |                                                                 |                                                                |
|--------------------------------------------------------------------------|--------------------------------------------------------------------------|--------------------------------------------------------------------------|
| [MainPage](src/pages/MainPage/README.md)                               | [ForbiddenPage](src/pages/ForbiddenPage/ui/README.md)                    |   [SettingsPage](src/pages/SettingsPage/README.md)          |
| [AdminPanelPage](src/pages/AdminPanelPage/README.md)                     |        [ProfilePage](src/pages/ProfilePage/ui/ProfilePage/README.md)                         |    [NotFoundPage](src/pages/NotFoundPage/ui/README.md)                       |
| [ArticleDetailsPage](src/pages/ArticleDetailsPage/ui/ArticleDetailsPage/README.md) | [MyArticlesPage](src/pages/MyArticlesPage/ui/MyArticlesPage.tsx)        |                  |
| [ArticleEditorPage](src/pages/ArticleEditorPage/ui/ArticleEditorPage/ArticleEditorPage.tsx) | [ArticlesPage](src/pages/ArticlesPage/README.md)                         |                                                                          |


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
