# Webpack Resolvers Configuration

This module exports a function `buildResolvers` that creates a Webpack `ResolveOptions` object based on the provided `BuildOptions`. The resolvers configuration is essential for defining how Webpack resolves modules and their paths, enhancing module resolution and simplifying imports.

## Function: `buildResolvers`

### Parameters

- **`options: BuildOptions`**: An object containing configuration options, including paths for module resolution.

### Returns

- **`ResolveOptions`**: A Webpack configuration object that specifies how modules are resolved.

### Configuration Properties

- **`extensions`**:
    - **Purpose**: Specifies the file extensions that Webpack will resolve.
    - **Configuration**:
        - `['.tsx', '.ts', '.js']`: Includes TypeScript and JavaScript file extensions, enabling Webpack to automatically resolve these file types during imports.

- **`preferAbsolute`**:
    - **Purpose**: Indicates Webpack’s preference for resolving modules with absolute paths.
    - **Configuration**:
        - `true`: Webpack will prioritize resolving modules with absolute paths before relative paths.

- **`modules`**:
    - **Purpose**: Defines the directories Webpack should search for modules.
    - **Configuration**:
        - `[options.paths.src, 'node_modules']`: Includes the source directory specified in `options.paths.src` and the `node_modules` directory. This ensures that Webpack can resolve modules from both the project's source directory and the standard `node_modules` directory.

- **`mainFiles`**:
    - **Purpose**: Specifies the main files to look for when resolving directories.
    - **Configuration**:
        - `['index']`: Webpack will look for an `index` file within directories, facilitating imports from directories without specifying a file name.

- **`alias`**:
    - **Purpose**: Creates path aliases to simplify module imports.
    - **Configuration**:
        - `{'@': options.paths.src}`: Maps the alias `@` to the project's source directory, allowing for shorter and more readable import paths within the application.

## Usage

The `buildResolvers` function streamlines module resolution in Webpack by setting up extensions, module directories, and path aliases. This configuration improves development efficiency by simplifying import paths and ensuring Webpack correctly resolves modules and their file types.

