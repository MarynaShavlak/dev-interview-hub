# CSS Loader Configuration

This module exports a function `buildCssLoader` that creates a Webpack loader configuration for handling SCSS and SASS files. The configuration adapts based on whether the build is in development or production mode, optimizing the handling of CSS modules and styles.

## Function: `buildCssLoader`

### Parameters

- **`isDev: boolean`**: A flag indicating whether the build is in development mode.

### Returns

- **`webpack.RuleSetRule`**: A Webpack loader rule object for processing SCSS and SASS files.

### Configuration Properties

- **`test`**:
    - **Purpose**: Specifies the file types to be processed by the loader.
    - **Configuration**:
        - `/\.s[ac]ss$/i`: Matches files with `.scss` or `.sass` extensions, applying the loader configuration to these file types.

- **`exclude`**:
    - **Purpose**: Excludes certain directories from being processed by the loader.
    - **Configuration**:
        - `/node_modules/`: Ensures that files in the `node_modules` directory are not processed by this loader.

- **`use`**:
    - **Purpose**: Defines the loaders to use for processing matched files.
    - **Configuration**:
        - **`isDev ? 'style-loader' : MiniCssExtractPlugin.loader`**:
            - **Development Mode (`isDev` is `true`)**: Uses `style-loader` to inject CSS directly into the DOM, which supports hot reloading of styles.
            - **Production Mode (`isDev` is `false`)**: Uses `MiniCssExtractPlugin.loader` to extract CSS into separate files for better caching and optimized builds.
        - **`css-loader`**:
            - **Purpose**: Processes CSS files and supports CSS modules.
            - **Options**:
                - **`modules`**:
                    - **`auto`**: Determines whether to use CSS modules based on the file path, enabling CSS modules if the file path includes `.module.`.
                    - **`localIdentName`**:
                        - **Development Mode (`isDev` is `true`)**: Uses a detailed naming pattern for class names to aid in debugging, including the file path and a hash.
                        - **Production Mode (`isDev` is `false`)**: Uses a shorter hash for class names to reduce file size.
        - **`sass-loader`**: Compiles SASS/SCSS files into CSS.

## Usage

The `buildCssLoader` function configures Webpack to handle SCSS and SASS files with different approaches for development and production environments. It optimizes the build process by managing CSS modules and leveraging appropriate loaders based on the build context. This setup ensures efficient handling of styles and supports features such as hot module replacement in development.
