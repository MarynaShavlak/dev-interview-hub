# Storybook Documentation

In this project, we provide story cases for each component using Storybook. These stories help in isolating and visually testing individual components.

Server requests are mocked using the `storybook-addon-mock` plugin, enabling us to simulate various API responses for our components within Storybook.

## Creating Story Files

For each component, a corresponding story file is created in the same directory with a `.stories.tsx` extension. This file contains the story cases for that specific component.

## Running Storybook

To launch Storybook, use the following command:
- `npm run storybook`

This will start a local server where you can interactively view and test your component stories.


Decorators:
- [RouterDecorator](../src/shared/config/storybook/RouterDecorator/RouterDecorator.tsx) - A function that takes a Storybook component (`StoryComponent`) and wraps it in `BrowserRouter`, allowing for proper handling of routes during testing.
- [StoreDecorator](../src/shared/config/storybook/StoreDecorator/StoreDecorator.tsx) - А  function  that wraps components in a Redux store with customizable state and reducers. This allows Storybook to simulate different Redux states and handle dynamic reducers for testing.
- [SuspenseDecorator](../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator.tsx) - A function that wraps components in React's Suspense, allowing Storybook to handle lazy-loaded components and asynchronous operations during rendering.
- [ThemeDecorator](../src/shared/config/storybook/ThemeDecorator/ThemeDecorator.tsx) - A function that wraps components in a ThemeProvider, allowing Storybook to apply different themes (e.g., light or dark) during component testing.
- [StyleDecorator](../src/shared/config/storybook/StyleDecorator/StyleDecorator.ts) - A function that applies global styles by importing the project's main stylesheet, allowing Storybook to render components with the correct global styles.
- [FeaturesFlagsDecorator](../src/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator.tsx) - A function that configures feature flags for Storybook components, allowing Storybook to simulate different feature states during component rendering.
- [ArticleRatingEnabledDecorator](../src/shared/config/storybook/ArticleRatingEnabledDecorator/ArticleRatingEnabledDecorator.tsx) - A Storybook decorator that enables the article rating feature by setting the appropriate feature flag before rendering the component.
- [NewDesignDecorator](../src/shared/config/storybook/NewDesignDecorator/NewDesignDecorator.tsx) - A Storybook decorator that enables the new design feature by setting the appropriate feature flag and applying a specific styling to simulate the redesigned app layout.
- [withI18nDecorator](../src/shared/config/storybook/withI18nDecorator/withI18nDecorator.tsx) - A Storybook decorator that provides internationalization support by wrapping components with the I18nextProvider configured with a test i18n instance.
