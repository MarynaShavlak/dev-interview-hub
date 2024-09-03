### Description for `global.d.ts`

The `global.d.ts` file in this React project provides global type declarations that enhance TypeScript's understanding of various module imports and global constants. Below is a breakdown of the declarations:

1. **SCSS Modules (`*.scss`)**:
    - Declares a module for SCSS files, allowing you to import SCSS stylesheets as modules in TypeScript.
    - The `IClassNames` interface represents a mapping of class names (strings) to their generated CSS class names.
    - The `classNames` constant is of type `IClassNames` and is exported for use in your components.

2. **Image Formats (`*.png`, `*.jpg`, `*.jpeg`)**:
    - Declares modules for login image formats (PNG, JPG, JPEG), allowing you to import these file types directly into your TypeScript files.

3. **SVG Files (`*.svg`)**:
    - Declares a module for SVG files, treating them as React components.
    - Imports React and defines `SVG` as a React function component (`VFC`) that accepts `SVGProps` for an `SVGSVGElement`.
    - Exports the `SVG` component as the default export, allowing SVG files to be used as React components in your application.

4. **Global Constants (`__IS_DEV__`, `__API__`, `__PROJECT__`)**:
    - Declares global constants to be used throughout the application:
        - `__IS_DEV__`: A boolean that indicates if the application is running in development mode.
        - `__API__`: A string representing the base API URL.
        - `__PROJECT__`: A string literal union type that indicates the current project environment, which can be 'storybook', 'frontend', or 'jest'.

5. **Utility Types**:
    - `DeepPartial<T>`: A recursive utility type that makes all properties of an object type `T` optional, including nested objects.
    - `OptionalRecord<K, T>`: A utility type that creates an optional record where keys `K` (of any type) map to values of type `T`.

This file is essential for ensuring that TypeScript properly understands and type-checks these various imports and constants, contributing to a more robust and type-safe codebase.
