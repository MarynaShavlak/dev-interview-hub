# Babel Loader Configuration

This module exports a function `buildBabelLoader` that creates a Webpack loader configuration for processing JavaScript and TypeScript files using Babel. The configuration is tailored for different build environments (development and production) and supports both JavaScript and TypeScript file formats.

## Function: `buildBabelLoader`

### Parameters

- **`BuildBabelLoaderProps`**: An object that extends `BuildOptions` with optional `isTsx` property.
    - **`isDev: boolean`**: A flag indicating whether the build is in development mode.
    - **`isTsx?: boolean`**: An optional flag indicating whether the files are TypeScript JSX (TSX) files.

### Returns

- **`webpack.RuleSetRule`**: A Webpack loader rule object for processing JavaScript and TypeScript files with Babel.

### Configuration Properties

- **`test`**:
    - **Purpose**: Specifies the file types to be processed by Babel.
    - **Configuration**:
        - **`isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/`**:
            - **If `isTsx` is `true`**: Matches files with `.jsx` or `.tsx` extensions.
            - **If `isTsx` is `false`**: Matches files with `.js` or `.ts` extensions.

- **`exclude`**:
    - **Purpose**: Excludes certain directories from being processed by Babel.
    - **Configuration**:
        - `/node_modules/`: Ensures that files in the `node_modules` directory are not processed.

- **`use`**:
    - **Purpose**: Defines the Babel loader and its options.
    - **Configuration**:
        - **`loader`**: Specifies `babel-loader` to process the files.
        - **`options`**:
            - **`cacheDirectory`**: Enables caching to improve build performance by storing the results of Babel transformations.
            - **`presets`**:
                - **`['@babel/preset-env']`**: Transforms modern JavaScript into a version compatible with older browsers.
            - **`plugins`**:
                - **`@babel/plugin-transform-typescript`**:
                    - **Purpose**: Transforms TypeScript syntax into JavaScript.
                    - **Configuration**:
                        - **`isTsx`**: Indicates whether to handle TSX syntax.
                - **`@babel/plugin-transform-runtime`**: Reduces code duplication by using Babel's helper functions.
                - **`babelRemovePropsPlugin`** (conditional):
                    - **Purpose**: Removes specified props from JSX elements in production builds.
                    - **Configuration**:
                        - **`props`**: Lists props to be removed, such as `data-testid`.
                - **`react-refresh/babel`** (development mode only):
                    - **Purpose**: Enables Fast Refresh for React components, providing a better development experience by preserving component state.

## Usage

The `buildBabelLoader` function configures Babel for processing JavaScript and TypeScript files, with specific adjustments for development and production environments. It supports TypeScript (including TSX) and JavaScript, manages caching, and applies various Babel plugins to optimize and transform code. This configuration ensures compatibility across different browsers and improves the development workflow with features like Fast Refresh.
