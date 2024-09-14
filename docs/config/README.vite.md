# Vite Configuration Documentation

This documentation provides an overview of the Vite configuration file. The configuration is designed to optimize and streamline the development process for a project using React.

## Configuration Properties

### 1. `plugins`
- **Purpose**: Specifies the Vite plugins used to extend the build functionality.
- **Configuration**:
    - **`svgr`**: Configures SVG handling, exporting SVGs as default React components.
        - **`exportAsDefault`**: Set to `true`, ensuring SVGs are treated as default exports.
    - **`react`**: Adds support for React features and optimizations.

### 2. `resolve`
- **Purpose**: Configures module resolution to simplify imports.
- **Configuration**:
    - **`alias`**: Creates path aliases for cleaner and more manageable imports.
        - **`find`**: Alias name (`'@'`).
        - **`replacement`**: Path to replace the alias (`'/src'`).

### 3. `define`
- **Purpose**: Defines global constants for use throughout the application.
- **Configuration**:
    - **`__IS_DEV__`**: Set to `true`, indicating the environment is in development mode.
    - **`__API__`**: Defines the API base URL as `'http://localhost:8000'`.
    - **`__PROJECT__`**: Sets the project name to `'frontend'`.

## Usage

This Vite configuration sets up essential plugins for handling React and SVGs, simplifies module imports with path aliases, and defines global constants for environment and API settings. It streamlines development by ensuring that imports are clean and environment-specific values are easily configurable.
