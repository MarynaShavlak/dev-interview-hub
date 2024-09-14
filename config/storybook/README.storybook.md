# Storybook Configuration Documentation

This documentation provides an overview of the Storybook configuration file used to set up and customize the Storybook environment for a React project. The configuration ensures that Storybook supports various addons, themes, and custom loaders, while integrating seamlessly with Webpack for a smooth development experience.

## Configuration Properties

### 1. `stories`
- **Purpose**: Specifies the location and pattern for Storybook stories.
- **Configuration**:
    - `['../../src/**/*.stories.@(js|jsx|ts|tsx)']`: Includes all story files with extensions `.js`, `.jsx`, `.ts`, or `.tsx` located in the `src` directory.

### 2. `addons`
- **Purpose**: Lists the addons used to enhance Storybook’s functionality.
- **Configuration**:
    - `@storybook/addon-links`: Provides linking between stories.
    - `@storybook/addon-essentials`: Includes essential addons, with `backgrounds` disabled.
    - `@storybook/addon-interactions`: Adds support for interactions in stories.
    - `storybook-addon-mock`: Enables mock data for stories.
    - `storybook-addon-themes`: Supports theme switching in Storybook.

### 3. `framework`
- **Purpose**: Defines the framework that Storybook uses.
- **Configuration**:
    - `'@storybook/react'`: Indicates that Storybook is set up for a React project.

### 4. `core`
- **Purpose**: Configures the core builder for Storybook.
- **Configuration**:
    - `builder: 'webpack5'`: Uses Webpack 5 as the bundler.

### 5. `webpackFinal`
- **Purpose**: Customizes the Webpack configuration used by Storybook.
- **Configuration**:
    - **Path Aliases**: Configures path aliases and module resolution.
        - `paths.src`: Defines the path to the `src` directory for simplified imports.
    - **Loaders**:
        - Excludes SVG files from default handling and adds support for SVGs via `@svgr/webpack`.
        - Integrates custom CSS loader using `buildCssLoader`.
    - **Plugins**:
        - Adds `DefinePlugin` to set global constants (`__IS_DEV__`, `__API__`, and `__PROJECT__`).

### 6. `parameters`
- **Purpose**: Sets global parameters for Storybook.
- **Configuration**:
    - `actions`: Configures action types for story interactions.
    - `controls`: Matches control types for color and date.
    - `layout`: Sets the default layout to `fullscreen`.
    - `themes`: Defines available themes, including `light`, `dark`, and `orange`.

### 7. `addDecorator`
- **Purpose**: Adds global decorators to enhance story rendering.
- **Configuration**:
    - `StyleDecorator`: Applies global styles.
    - `ThemeDecorator`: Sets the default theme to `light`.
    - `RouterDecorator`: Integrates routing capabilities.
    - `SuspenseDecorator`: Adds support for React Suspense.
    - `FeaturesFlagsDecorator`: Integrates feature flags (currently empty).

## Usage

This Storybook configuration is designed to provide a robust environment for developing and testing React components. It includes various addons for enhanced functionality, custom Webpack settings for flexible module handling, and global decorators to ensure consistent styling and functionality across stories. To adjust the configuration for specific needs, refer to the [Storybook documentation](https://storybook.js.org/docs/react/configure/overview) for detailed explanations of each option.

This configuration is stored in a TypeScript file, which ensures type checking and improved IDE support when making adjustments.
