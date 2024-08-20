# Jest Configuration Documentation

This documentation provides an overview of the Jest configuration file `jest.config.ts`. This file configures Jest, a testing framework for JavaScript and TypeScript, to suit the project's needs. The configuration is tailored for a development environment where Jest is used for unit testing with extensive support for various file types and frameworks.

## Configuration Properties

### 1. `globals`
- **Purpose**: Defines global variables that are accessible throughout the test suite.
- **Configuration**:
    - `__IS_DEV__`: A boolean flag set to `true`, indicating the environment is in development mode.
    - `__API__`: A placeholder for the API URL, initialized as an empty string.
    - `__PROJECT__`: A string indicating the project name, set to `'jest'`.

### 2. `clearMocks`
- **Purpose**: Automatically clears mock calls and instances before every test.
- **Type**: `boolean`
- **Default Value**: `true`
- **Effect**: Ensures no residual mocks affect subsequent tests, promoting test isolation.

### 3. `testEnvironment`
- **Purpose**: Specifies the environment in which the tests are executed.
- **Type**: `string`
- **Default Value**: `'jsdom'`
- **Effect**: Simulates a browser environment using jsdom, which is crucial for testing React components and other frontend logic.

### 4. `coveragePathIgnorePatterns`
- **Purpose**: Excludes specified paths from test coverage calculations.
- **Type**: `string[]`
- **Configuration**:
    - `['\\\\node_modules\\\\']`: Ignores all files inside `node_modules`, as these are third-party dependencies not subject to testing.

### 5. `moduleFileExtensions`
- **Purpose**: Defines the file extensions Jest will recognize and process.
- **Type**: `string[]`
- **Configuration**:
    - `['js', 'jsx', 'ts', 'tsx', 'json', 'node']`: Supports JavaScript, TypeScript, JSON, and Node.js files.

### 6. `moduleDirectories`
- **Purpose**: Specifies directories Jest should search for modules.
- **Type**: `string[]`
- **Configuration**:
    - `['node_modules']`: Standard directory for third-party modules.

### 7. `modulePaths`
- **Purpose**: Specifies additional paths to look for modules.
- **Type**: `string[]`
- **Configuration**:
    - `['<rootDir>src']`: Simplifies module imports by allowing direct import from the `src` directory.

### 8. `testMatch`
- **Purpose**: Defines the patterns Jest uses to detect test files.
- **Type**: `string[]`
- **Configuration**:
    - `['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)']`: Matches all `spec` or `test` files with extensions `.js`, `.jsx`, `.ts`, or `.tsx` in the `src` directory. Note the usage of both forward slashes and backslashes for cross-platform compatibility.

### 9. `rootDir`
- **Purpose**: Sets the root directory for Jest.
- **Type**: `string`
- **Configuration**:
    - `'../../'`: Configures the root directory to be two levels up from the configuration file location.

### 10. `setupFilesAfterEnv`
- **Purpose**: Specifies scripts that Jest runs after the test environment is set up.
- **Type**: `string[]`
- **Configuration**:
  - `['<rootDir>config/jest/setupTests.ts']`: Points to a setup file that configures the testing environment, such as adding custom matchers or configuring global settings.

### 11. `moduleNameMapper`
- **Purpose**: Maps module names or file extensions to specific modules or mocks.
- **Type**: `Record<string, string>`
- **Configuration**:
  - `'\\.s?css$'`: Maps CSS and SCSS imports to `identity-obj-proxy`, which mocks them during testing.
  - `'\\.svg|png'`: Maps SVG and PNG files to a mock component (`jestEmptyComponent.tsx`), which ensures they don't break tests.
  - `'^@/(.*)$'`: Aliases `@` to the `src` directory, simplifying imports.

### 12. `reporters`
- **Purpose**: Configures how test results are reported.
- **Type**: `Array<string | [string, object]>`
- **Configuration**:
  - `['default']`: Uses Jest's default reporter.
  - `['jest-html-reporters', {...}]`: Adds `jest-html-reporters` for generating an HTML report.
    - **Options**:
      - `publicPath`: Sets the output path for the report.
      - `filename`: Sets the name of the generated HTML report.
      - `openReport`: Automatically opens the report in the browser after the tests run.
      - `inlineSource`: Embeds source code directly into the report for better readability.

## Usage

This Jest configuration is designed for a project using TypeScript with a focus on frontend testing in a simulated browser environment (using jsdom). It provides a comprehensive setup that ensures test isolation, cross-platform compatibility, and detailed reporting. To customize this setup, refer to the [Jest documentation](https://jestjs.io/docs/configuration) for a detailed explanation of each configuration option.

This configuration is stored in a TypeScript file (`jest.config.ts`), allowing for type checking and enhanced IDE support when modifying the configuration.
