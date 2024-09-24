# Project Configuration Documentation

All configuration files are systematically organized within the `/config` directory:

## [Babel Configuration](./babel/README.md)
The Babel configuration utilizes a custom plugin to remove specified JSX properties from the code. This plugin is designed to:

- **Remove JSX Properties**: Exclude certain properties (e.g., `data-testid`) from JSX elements during the transformation process.
- **Enhance Code Quality**: Ensure the final output code is clean and secure by removing unwanted properties from production builds.

## [Webpack Configuration](./build/README.webpack.md)
The Webpack configuration is structured to handle various aspects of the build process, with specific setups for development and production environments. It is organized into several key components:

1. **[Loaders](./build/buildLoaders/README.loaders.md)**:
    - **[CSS Loader](./build/loaders/buildCssLoader/README.cssloader.md)**: Configures handling of SCSS and SASS files, using `style-loader` for development and `MiniCssExtractPlugin.loader` for production to optimize CSS extraction and caching.
    - **[Babel Loader](./build/loaders/buildBabelLoader/README.babelloader.md)**: Processes JavaScript and TypeScript files with Babel, applying transformations based on the environment and handling TypeScript (TSX) files with appropriate plugins.

2. **[Plugins](./build/buildPlugins/README.plugins.md)**:
    - **HtmlWebpackPlugin**: Generates an HTML file that includes all the webpack bundles.
    - **MiniCssExtractPlugin**: Extracts CSS into separate files for production builds.
    - **ReactRefreshWebpackPlugin**: Enables React Fast Refresh for a better development experience.
    - **CircularDependencyPlugin**: Detects and reports circular dependencies in the project.
    - **ForkTsCheckerWebpackPlugin**: Provides TypeScript type checking and linting.
    - **BundleAnalyzerPlugin**: Analyzes the size of the Webpack output for optimization insights.
    - **CopyPlugin**: Copies static assets, such as locales, to the build directory.

3. **[Resolvers](./build/buildResolvers/README.resolvers.md)**:
    - Configures module resolution to simplify imports by setting up path aliases and specifying file extensions.

4. **[Dev Server](./build/buildDevServer/README.devserver.md)**:
    - Sets up Webpack Dev Server with features like automatic browser opening, hot module replacement, and history API fallback for development.

This configuration ensures efficient builds with support for modern JavaScript and TypeScript, optimized asset handling, and enhanced development experience through various Webpack plugins and settings.

## [Testing Environment Configuration for Jest](./jest/README.md)

## [Storybook Configuration](./storybook/README.storybook.md)
