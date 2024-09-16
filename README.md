## Запуск проєкту

```
npm install - встановлення залежностей
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проєкту в dev режимі
```

----

## Скрипты

- `npm run start` - Запуск frontend проєкту на webpack dev server
- `npm run start:vite` - Запуск frontend проєкту на vite
- `npm run start:dev` - Запуск frontend проєкту на webpack dev server + backend
- `npm run start:dev:vite` - Запуск frontend проєкту на vite + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Збірка в prod режимі
- `npm run build:dev` - Збірка в dev режимі (не мінімізований)
- `npm run lint:ts` - Перевірка ts файлів лінтером
- `npm run lint:ts:fix` - Виправлення ts файлів лінтером
- `npm run lint:scss` - Перевірка scss файлів style лінтером
- `npm run lint:scss:fix` - Виправлення scss файлів style лінтером
- `npm run test:unit` - Запуск unit тестів з jest
- `npm run test:ui` - Запуск скріншотних тестів з loki
- `npm run test:ui:ok` - Підтвердження нових скріншотів
- `npm run test:ui:ci` - Запуск скріншотних тестів в CI
- `npm run test:ui:report` - Генерація повного звіту для скріншотних тестів
- `npm run test:ui:json` - Генерація json звіту для скріншотних тестів
- `npm run test:ui:html` - Генерація HTML звіту для скріншотних тестів
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Збірка storybook білда
- `npm run prepare` - прекоміт хуки
- `npm run generate:slice` - Скрипт для генерації FSD слайсів

----

## Архітектура проєкту

Проєкт написаний відповідно до методології Feature sliced design

Посилання на документацію - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Робота з перекладами

У проєкті використовується бібліотека i18next для роботи з перекладами.
Файли з перекладами зберігаються в public/locales.

Для комфортної роботи рекомендовано встановити плагін для webstorm/vscode

Документація i18nex - [https://react.i18next.com/](https://react.i18next.com/)

----

## Тести

У проєкті використовуються 4 види тестів:
1) Звичайні unit тести на jest - `npm run test:unit`
2) Тести на компоненти з React testing library -`npm run test:unit`
3) Скріншотне тестування з loki `npm run test:ui`
4) e2e тестування з Cypress `npm run test:e2e`

Докладніше про тести - [документація тестування](/docs/tests.md)

----

## Лінтинг

У проєкті використовується eslint для перевірки typescript коду і stylelint для перевірки файлів зі стилями.

Також для строгого контролю основних архітектурних принципів
використовується власний eslint plugin *ms-production-project-plugin*,
який містить 3 правила
1) path-checker - забороняє використовувати абсолютні імпорти в рамках одного модуля
2) layer-imports - перевіряє коректність використання шарів з точки зору FSD
   (наприклад widgets не можна використовувати в features і entities)
3) public-api-imports - дозволяє імпорт з інших модулів тільки з public api. Має auto fix

##### Запуск лінтерів
- `npm run lint:ts` - Перевірка ts файлів лінтером
- `npm run lint:ts:fix` - Виправлення ts файлів лінтером
- `npm run lint:scss` - Перевірка scss файлів style лінтером
- `npm run lint:scss:fix` - Виправлення scss файлів style лінтером

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
Additionally, the scripts folder contains various scripts for refactoring, simplifying code development, generating reports, and other tasks.

1. [update absolute imports with alias](./scripts/refactoring/updateImports/README.updateimports.md): 
  - **Purpose**: This script automates the process of modifying absolute import paths in a TypeScript project. It identifies import statements that reference specific "layers" (`app`, `shared`, `entities`, etc.) and prepends them with a custom prefix (`@/`). This ensures a consistent and organized import structure across the project, helping to standardize the way absolute imports are handled. The script efficiently processes all `.ts` and `.tsx` files in the `src/` directory and saves the updated files to disk.
  - **Command**: `npm run update-absolute-import`
2. [create public API for shared ui](./scripts/refactoring/createPublicApiForSharedUi/README.sharedPublicApi.md):
   - **Purpose**: This script generates index.ts files for all UI component directories in a TypeScript project and updates import paths to use a consistent format. It ensures each component directory in `src/shared/ui/` has an `index.ts` file that re-exports its contents and standardizes import paths to simplify and unify component references.
   - **Command**: `npm run create-publicApi-for-shared-ui`

3. [remove feature toggles](./scripts/remove-feature/README.removeFeature.md):
   - **Purpose**: This script automates the removal of feature toggles in a TypeScript project. It replaces or removes `toggleFeatures` function calls and `ToggleFeaturesComponent` elements based on the specified feature state (`on` or `off`), allowing developers to automatically clean up deprecated or unnecessary features in the codebase.
   - **Command**: npx ts-node ./scripts/remove-feature.ts <featureName> <featureState>
----

## CI pipeline та pre commit хуки

Конфігурація github actions знаходиться в /.github/workflows.
В CI проганяються всі види тестів, збірка проєкту і сторібука, лінтинг.

У прекоміт хуках перевіряємо проєкт лінтерами, конфіг в /.husky

----

### Робота з даними

Взаємодія з даними здійснюється за допомогою redux toolkit.
По можливості повторно використовувані сутності необхідно нормалізувати за допомогою EntityAdapter

Запити на сервер відправляються за допомогою [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного підключення редюсерів (щоб не тягнути їх у загальний бандл) використовується
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

----
## Робота із feature-flags
Дозволено використання feature flags тільки за допомогою хелпера toggleFeatures

В нього передається об'єкт з опціями: 

{
name: назва фіча-прапора,
on: функція, яка відпрацює після Увімкнення фічі
of: функція, яка відпрацює після Вимкнення фічі
}

Для автоматичного видалення фічі використовувати скрипт remove-feature.ts,
який приймає 2 аргументи
1. Назва фіча-прапора, що видаляється
2. Стан (on\off)

## Сутності (entities)

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Фічі (features)

- [addCommentForm](/src/features/addCommentForm)
- [articleRating](/src/features/articleRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [editableProfileCard](/src/features/editableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [notificationButton](/src/features/notificationButton)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [ScrollRestoration](/src/features/UI)
