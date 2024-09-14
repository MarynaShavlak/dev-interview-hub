# Webpack Configuration Documentation

This documentation provides an overview of the Webpack configuration file, which sets up Webpack based on the environment and project requirements.

## Configuration Properties

### 1. `paths`
- **Purpose**: Defines key directory paths used throughout the Webpack configuration.
- **Configuration**:
    - **`entry`**: Path to the main entry file of the application (`src/index.tsx`).
    - **`build`**: Directory for the build output (`build`).
    - **`html`**: Path to the HTML template file (`public/index.html`).
    - **`src`**: Source directory for application code (`src`).
    - **`locales`**: Directory for locale files (`public/locales`).
    - **`buildLocales`**: Directory for build output of locale files (`build/locales`).

### 2. `mode`
- **Purpose**: Specifies the Webpack mode (development or production).
- **Configuration**:
    - Defaults to `'development'` if not provided.

### 3. `PORT`
- **Purpose**: Defines the port number for the development server.
- **Configuration**:
    - Defaults to `3000` if not provided.

### 4. `apiUrl`
- **Purpose**: Specifies the base URL for the API.
- **Configuration**:
    - Defaults to `'http://localhost:8000'` if not provided.

### 5. `isDev`
- **Purpose**: Determines if the build is in development mode.
- **Configuration**:
    - Set to `true` if `mode` is `'development'`.

### 6. `config`
- **Purpose**: Generates the Webpack configuration based on the provided environment variables and paths.
- **Configuration**:
    - Uses the `buildWebpackConfig` function to create a configuration object with:
        - **`mode`**: Build mode (development or production).
        - **`paths`**: Paths configuration.
        - **`isDev`**: Boolean indicating if the environment is development.
        - **`port`**: Port number for the development server.
        - **`apiUrl`**: API base URL.
        - **`project`**: Project name set to `'frontend'`.

## Usage

This Webpack configuration dynamically generates the Webpack setup based on environment variables and project paths. It allows for flexible configuration between development and production modes, including API URL, server port, and directory paths for source files and build outputs.
