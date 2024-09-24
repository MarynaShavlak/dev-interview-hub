# Dev-hub Platform

## Project Launch

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

## Project Architecture

The project is developed following the **Feature-Sliced Design** methodology.

For more information, please refer to the documentation on [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Working with Translations

The project uses the **i18next** library for managing translations. Translation files are stored in the `public/locales` directory.

For an efficient workflow, it is recommended to install the i18next plugin for WebStorm or VSCode, which provides helpful features like autocompletion for translation keys and detecting missing translations.

You can find more detailed documentation for i18next here: [i18next Documentation](https://react.i18next.com/).

For the configuration related to translations, refer to the [configuration file](./src/shared/config/i18n/i18n.ts).


----

## Tests

The project uses 4 types of tests:

| Test Type                        | Command                   | Description                                            |
|----------------------------------|---------------------------|--------------------------------------------------------|
| **Unit Tests (Jest)**            | `npm run test:unit`      | Verifies core functionality and ensures functions operate as intended. |
| **Component Tests (React Testing Library)** | `npm run test:unit`      | Assesses the behavior and rendering of React components. |
| **Screenshot Tests (Loki)**      | `npm run test:ui`        | Conducts visual regression testing to maintain UI consistency. |
| **End-to-End Tests (Cypress)**   | `npm run test:e2e`       | Tests comprehensive user flows and interactions.       |

For more details, refer to the [tests documentation](/docs/tests.md)

----

## Linting

The project uses ESLint for checking TypeScript code and Stylelint for style files.

Additionally, to strictly enforce core architectural principles, a custom ESLint plugin, <a href="https://www.npmjs.com/package/eslint-plugin-ms-production-project-plugin" target="_blank">ms-production-project-plugin</a>, is used. This plugin includes three key rules:
1. **path-checker**: Prohibits the use of absolute imports within the same module._**Includes auto-fix functionality**_.
2. **layer-imports**: Ensures proper layer usage according to the FSD architecture (e.g., widgets cannot be used in features or entities).
3. **public-api-imports**: Allows imports from other modules only through their public API. _**Includes auto-fix functionality**_.

Furthermore, the project includes another custom plugin, <a href="https://www.npmjs.com/package/eslint-plugin-toggle-features-rule-plugin" target="_blank">eslint-plugin-toggle-features-rule-plugin</a>, which supports feature flag management with the following two rules:
1. **one-line-arrow-function**: Enforces one-line arrow functions for `on` and `off` options in the `toggleFeatures` helper to maintain clean and concise code.
2. **component-jsx-props**: Ensures that only JSX elements are passed directly to the `on` and `off` props of the `ToggleFeaturesComponent`, preventing the use of variables and making feature flag removal easier.

Both plugins help maintain the project's code quality and consistency, while also supporting the automated removal of feature flags.

##### Running Linters
- `npm run lint:ts` - Lint TypeScript files
- `npm run lint:ts:fix` - Fix TypeScript linting issues
- `npm run lint:scss` - Lint SCSS files with Stylelint
- `npm run lint:scss:fix` - Fix SCSS linting issues


----

## Storybook

[//]: # (У проєкті для кожного компонента описуються сторі-кейси.)

[//]: # (Запити на сервер мокаються за допомогою storybook-addon-mock.)

[//]: # ()
[//]: # (Файл зі сторі-кейсами створює поруч з компонентом з розширенням .stories.tsx)

[//]: # ()
[//]: # (Запустити сторібук можна командою:)

[//]: # (- `npm run storybook`)

[//]: # ()
[//]: # (Докладніше про [Storybook]&#40;/docs/storybook.md&#41;)

[//]: # ()
[//]: # (Приклад:)

[//]: # ()
[//]: # (```typescript jsx)

[//]: # (import React from 'react';)

[//]: # (import { ComponentStory, ComponentMeta } from '@storybook/react';)

[//]: # ()
[//]: # (import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';)

[//]: # (import { Button, ButtonSize, ButtonTheme } from './Button';)

[//]: # (import { Theme } from '@/shared/const/theme';)

[//]: # ()
[//]: # (export default {)

[//]: # (    title: 'shared/Button',)

[//]: # (    component: Button,)

[//]: # (    argTypes: {)

[//]: # (        backgroundColor: { control: 'color' },)

[//]: # (    },)

[//]: # (} as ComponentMeta<typeof Button>;)

[//]: # ()
[//]: # (const Template: ComponentStory<typeof Button> = &#40;args&#41; => <Button {...args} />;)

[//]: # ()
[//]: # (export const Primary = Template.bind&#40;{}&#41;;)

[//]: # (Primary.args = {)

[//]: # (    children: 'Text',)

[//]: # (};)

[//]: # ()
[//]: # (export const Clear = Template.bind&#40;{}&#41;;)

[//]: # (Clear.args = {)

[//]: # (    children: 'Text',)

[//]: # (    theme: ButtonTheme.CLEAR,)

[//]: # (};)

[//]: # (```)


----

## Project Configuration

The project utilizes two primary build configurations:

1. [Webpack](./docs/config/README.webpack.md) 
   - **Purpose**: Webpack is a versatile build tool designed to adapt to various environments and project needs.
   - **Configuration**: Find the configuration details in [webpack.config.ts](./webpack.config.ts)
   - **Usage**: To run the project with Webpack, use the command:: `npm run start`.
   - **Documentation**: For more information, refer to the [Webpack configuration guide](./docs/config/README.webpack.md) .
2. [Vite](./docs/config/README.vite.md)
   - **Purpose**: Vite serves as an alternative build tool, offering faster development and build processes.
   - **Configuration**: Find the configuration details in [vite.config.ts](./vite.config.ts)
   - **Usage**: To start the project using Vite, use the command: `npm run start:vite`. 
   - **Documentation**: For more information, refer to the [Vite configuration guide](./docs/config/README.vite.md).

Both build tools are tailored to support the core features of the application efficiently.

All configuration files are systematically organized within the `/config` directory:

### [Babel configuration](./config/babel/README.md) 
The Babel configuration utilizes a custom plugin to remove specified JSX properties from the code. This plugin is designed to:

- **Remove JSX Properties**: Exclude certain properties (e.g., data-testid) from JSX elements during the transformation process.
- **Enhance Code Quality**: Ensure the final output code is clean and secure by removing unwanted properties from production builds.

### [Webpack Configuration](./config/build/README.webpack.md)

Webpack configuration is structured to handle various aspects of the build process, with specific setups for development and production environments. It is organized into several key components:

1. **[Loaders](./config/build/buildLoaders/README.loaders.md)**:
   - **[CSS Loader](./config/build/loaders/buildCssLoader/README.cssloader.md)**: Configures handling of SCSS and SASS files, using `style-loader` for development and `MiniCssExtractPlugin.loader` for production to optimize CSS extraction and caching.
   - **[Babel Loader](./config/build/loaders/buildBabelLoader/README.babelloader.md)**: Processes JavaScript and TypeScript files with Babel, applying transformations based on the environment and handling TypeScript (TSX) files with appropriate plugins.

2. **[Plugins](./config/build/buildPlugins/README.plugins.md)**:
   - **HtmlWebpackPlugin**: Generates an HTML file that includes all the webpack bundles.
   - **MiniCssExtractPlugin**: Extracts CSS into separate files for production builds.
   - **ReactRefreshWebpackPlugin**: Enables React Fast Refresh for a better development experience.
   - **CircularDependencyPlugin**: Detects and reports circular dependencies in the project.
   - **ForkTsCheckerWebpackPlugin**: Provides TypeScript type checking and linting.
   - **BundleAnalyzerPlugin**: Analyzes the size of the Webpack output for optimization insights.
   - **CopyPlugin**: Copies static assets, such as locales, to the build directory.

3. **[Resolvers](./config/build/buildResolvers/README.resolvers.md)**:
   - Configures module resolution to simplify imports by setting up path aliases and specifying file extensions.

4. **[Dev Server](./config/build/buildDevServer/README.devserver.md)**:
   - Sets up Webpack Dev Server with features like automatic browser opening, hot module replacement, and history API fallback for development.

This configuration ensures efficient builds with support for modern JavaScript and TypeScript, optimized asset handling, and enhanced development experience through various Webpack plugins and settings.


### [Testing environment configuration for Jest](./config/jest/README.md)

### [Storybook configuration](./config/storybook/README.storybook.md)

## Additional scripts
The `scripts` folder houses various utilities designed to streamline development processes, enhance code quality, and maintain project integrity.

1. [Update Absolute Imports with Alias](./scripts/refactoring/updateImports/README.updateimports.md): 
  - **Purpose**: Automates modification of absolute import paths in TypeScript projects by prefixing specific "layers" (`app`, `shared`, `entities`, etc.) with `@/`. Ensures a consistent import structure across the project for improved organization and maintainability.
  - **Command**: `npm run update-absolute-import`
2. [Create Public API for Shared UI:](./scripts/refactoring/createPublicApiForSharedUi/README.sharedPublicApi.md):
   - **Purpose**: Generates `index.ts` files for UI component directories in `src/shared/ui/`, standardizing import paths and simplifying component references.
   - **Command**: `npm run create-publicApi-for-shared-ui`

3. [Remove Feature Toggles:](./scripts/remove-feature/README.removeFeature.md):
   - **Purpose**: Automates removal of feature toggles in TypeScript projects based on specified state (`on` or `off`), ensuring deprecated features are cleanly removed from the codebase.
   - **Command**: `npx ts-node ./scripts/remove-feature.ts <featureName> <featureState>`
   
4. [Generate Loki Report:](./scripts/generate-loki-report/README.visualLokiReport.md):
   - **Purpose**: Generates a `report.json` for visual regression testing with Loki, facilitating comparison of component changes visually to maintain UI quality.
   - **Command**: `npm run test:ui:json`
   
5. [Generate FSD Slice:](./scripts/createSlice/README.createSlice.md):
   - **Purpose**: Automates creation of Redux slices in TypeScript projects, including directory structure, model files, UI components, and public API, enhancing consistency and reducing development time.
   - **Command**: `node scripts/createSlice/generate-fsd-slice.js <layer> <sliceName>`

6. [Clear Cache:](./scripts/clear-cache/README.clear-cache.md):
   - **Purpose**:Clears `.cache` directory in `node_modules` to remove outdated or corrupt cache files, ensuring smooth operation of tools like Babel loader.
   - **Command**: `node ./scripts/clear-cache/clear-cache.js`

----

## CI Pipeline and Pre-commit Hooks

The configuration for **GitHub Actions** is located in [.github/workflows](./.github/workflows/README.md). 
In the CI process, all types of tests are run, the project and Storybook are built, and linting is performed.

In the pre-commit hooks, we check the project using linters, with the configuration found in [.husky](./.husky).

----

## Working with Data

Data interactions are handled using the **Redux Toolkit**.
TTo enhance reusability, entities are normalized with the **EntityAdapter** wherever applicable. 
In this project, it is specifically utilized to normalize the data for [articles](./src/pages/ArticlesPage/model/slices/README.md) and  [comments](./src/features/ArticleComments/model/slices/README.md) within their respective slices. 

Server requests are managed using **RTK query**, with the configuration available at  [rtkApi](./src/shared/api/rtkApi.ts)

For asynchronous integration of reducers — ensuring they are not included in the main bundle — [DynamicModuleLoader](./src/shared/lib/components/DynamicModuleLoader/README.md) is implemented.

----

## Working with Feature Flags
The use of feature flags is only allowed through the `toggleFeatures` helper or `ToggleFeaturesComponent` component.
To ensure that feature flags are consistently and correctly implemented, a custom ESLint plugin  <a href="https://www.npmjs.com/package/eslint-plugin-toggle-features-rule-plugin" target="_blank">eslint-plugin-toggle-features-rule-plugin</a> has been developed. 
This plugin enforces specific rules that simplify feature flag management and ensure compatibility with automatic feature flag removal scripts.

### [toggleFeatures](./src/shared/lib/features/lib/toggleFeatures/README.md)  Helper
The `toggleFeatures` helper is used to control the logic based on the feature flag status. It accepts an object with the following options::
```javascript
const options = {
  name: 'feature-flag-name',  // Name of the feature flag
  on: () => {}, // logic to execute when the feature is enabled 
  off: () => {}, // logic to execute when the feature is disabled 
}
```

### [ToggleFeaturesComponent](./src/shared/lib/features/components/ToggleFeaturesComponent/README.md)
The `ToggleFeaturesComponent` is a React component designed to toggle between two different UI elements based on the state of a feature flag. It takes the following props:

- `feature`: The name of the feature flag.
- `on`: The React element to render when the feature is enabled.
- `off`: The React element to render when the feature is disabled.

### Custom ESLint Plugin: `eslint-plugin-toggle-features-rule-plugin`

This project includes a custom ESLint plugin with two key rules that enforce proper feature flag usage and support automated feature flag removal:

1. **`one-line-arrow-function`**:
   - Enforces one-line arrow functions for the `on` and `off` options in the `toggleFeatures` helper, ensuring concise and maintainable logic.
2. **`component-jsx-props`**:
   - Ensures only JSX elements are passed directly to the `on` and `off` props of `ToggleFeaturesComponent`, preventing the use of variables.

Following these rules ensures clean, automated feature flag removal.


### Removing Feature Flags
To automatically remove a feature flag, use the [remove-feature.ts](./scripts/remove-feature/README.removeFeature.md) script, which takes two arguments:
1. The name of the feature flag to be removed
2. The feature state (`on`/`off`)

> [!IMPORTANT]
> The success of automatic feature flag removal is directly tied to the proper use of the custom ESLint plugin. By adhering to the rules defined in the plugin, you ensure that the feature toggle logic is structured in a way that allows for clean, automated feature removal.

## Layers according FSD

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
- [AuthByUsername](./src/features/AuthByUsername/README.md)
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

