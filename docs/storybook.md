# Storybook Documentation

Storybook is used to create a comprehensive showcase of components, facilitating their isolation and visual testing. Each component is documented with dedicated story files, which allow for interactive exploration and testing across different states and scenarios.

The `storybook-addon-mock` plugin is employed to mock server requests, simulating various API responses directly within Storybook. This approach ensures that components can be tested in a realistic environment without relying on live services.

## Storybook Version
We are using Storybook version `6.5.13`. Ensure compatibility with this version when setting up or modifying Storybook.


## [Configuration details](../config/storybook/README.storybook.md)
## Creating Story Files

Each component should have a corresponding story file located in the same directory, with a `.stories.tsx` extension. These files contain the story cases for their respective components.

## Running Storybook

To start Storybook, run the following command:
- `npm run storybook`

This command launches a local server where you can interactively view and test your component stories.


## Decorators
Storybook decorators enhance components with additional functionality or context. Here are the decorators used in this project:
- [RouterDecorator](../src/shared/config/storybook/RouterDecorator/RouterDecorator.tsx) - Wraps components in a `BrowserRouter` to handle routing during tests.
- [StoreDecorator](../src/shared/config/storybook/StoreDecorator/StoreDecorator.tsx) - Wraps components in a Redux store with customizable state and reducers, simulating different Redux states.
- [SuspenseDecorator](../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator.tsx) - Wraps components in React's Suspense to manage lazy-loaded components and asynchronous operations.
- [ThemeDecorator](../src/shared/config/storybook/ThemeDecorator/ThemeDecorator.tsx) - Wraps components in a ThemeProvider to apply different themes (e.g., light or dark) during testing.
- [StyleDecorator](../src/shared/config/storybook/StyleDecorator/StyleDecorator.ts) - Imports the main stylesheet to apply global styles, ensuring components render with the correct styling.
- [FeaturesFlagsDecorator](../src/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator.tsx) - Configures feature flags for components, simulating different feature states.
- [ArticleRatingEnabledDecorator](../src/shared/config/storybook/ArticleRatingEnabledDecorator/ArticleRatingEnabledDecorator.tsx) - Enables the article rating feature by setting the appropriate flag.
- [NewDesignDecorator](../src/shared/config/storybook/NewDesignDecorator/NewDesignDecorator.tsx) - Activates the new design feature and applies specific styling to simulate the redesigned app layout.
- [withI18nDecorator](../src/shared/config/storybook/withI18nDecorator/withI18nDecorator.tsx) - Provides internationalization support by wrapping components with the I18nextProvider configured with a test i18n instance.
- [AlignDecorator](../src/shared/config/storybook/AlignDecorator/AlignDecorator.tsx) - Adjusts component alignment (e.g., center or right) based on the specified value.
- [CustomStylesDecorator](../src/shared/config/storybook/CustomStylesDecorator/CustomStylesDecorator.tsx) - Applies custom inline styles to components for flexible styling during testing.


## Example 
```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StarRating } from './StarRating';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/common/StarRating/StarRating',
    component: StarRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => (
    <StarRating {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};

export const WithTwoSelectedStars = Template.bind({});
WithTwoSelectedStars.args = { selectedStars: 2 };
```


## Conclusion 
Storybook is a powerful tool for developing and testing components in isolation, offering a robust environment for visual and functional verification. In this project, a comprehensive component showcase has been established using Storybook, enabling effective isolation and visual testing of each component. Custom decorators have been integrated, and various addons have been utilized to tailor the Storybook environment to meet specific needs and enhance the development workflow.
