# Webpack Configuration Builder

This module exports a function `buildWebpackConfig` that generates a Webpack configuration object based on the provided `BuildOptions`. 
It centralizes the setup of Webpack configurations, including entry points, output settings, plugins, loaders, resolvers, and development server options.

## Function: `buildWebpackConfig`

### Parameters

- **`options: BuildOptions`**: An object containing various configuration options for building the Webpack configuration. This includes paths, mode, and a boolean indicating if the build is in development mode.

### Returns

- **`webpack.Configuration`**: A Webpack configuration object that is customized based on the input options.

### Configuration Properties

- **`mode`**: Sets the Webpack mode, either `development` or `production`, based on the `options.mode`.

- **`entry`**: Specifies the entry point of the application, defined by `paths.entry`.

- **`output`**:
    - **`filename`**: Determines the naming convention for output files, using `[name].[contenthash].js` to enable long-term caching.
    - **`path`**: Defines the output directory for the built files, specified by `paths.build`.
    - **`clean`**: Ensures the output directory is cleaned before each build.
    - **`publicPath`**: Sets the base URL for all assets within the application, set to `'/'`.

- **`plugins`**: Integrates plugins into the Webpack configuration using the `buildPlugins` function.

- **`module`**:
    - **`rules`**: Defines loaders and rules for processing different types of files using the `buildLoaders` function.

- **`resolve`**: Configures module resolution using the `buildResolvers` function.

- **`devtool`**: Configures source maps for development mode (`'eval-cheap-module-source-map'`) or disables them for production mode.

- **`devServer`**: Configures the development server if `isDev` is `true`, using the `buildDevServer` function.

## Usage

This function is used to generate a Webpack configuration tailored to the specific needs of the project. By abstracting the configuration into separate functions (`buildPlugins`, `buildLoaders`, `buildResolvers`, and `buildDevServer`), it provides a modular approach to Webpack setup, making the configuration more maintainable and customizable.

This setup ensures that the Webpack build is optimized for both development and production environments, with appropriate settings for entry points, output files, and development server options.
