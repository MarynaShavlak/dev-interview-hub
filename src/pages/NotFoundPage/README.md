# Page NotFoundPage Documentation

## Overview
The **`NotFoundPage`**   module handles the display of a 404 error page when users attempt to access a non-existent page within the application. Built with flexibility in mind, it uses feature toggling to switch between different versions of the UI, ensuring a consistent and localized user experience.

# Module Structure

The `NotFoundPage`  module is organized into UI components and an entry point, as shown below:
```text
NotFoundPage/
├── ui/
│   ├── NotFoundPage.tsx
│   ├── NotFoundPageSkeleton.tsx
│   └── NotFoundPage.module.scss
└── index.ts
```

## Detailed Description

### 1. `ui/`: UI components
- [**NotFoundPage.tsx**](./ui/README.md): Main component that displays a localized 404 error message when a user navigates to a page that does not exist.
- [**NotFoundPageSkeleton.tsx**](./ui/NotFoundPageSkeleton.tsx):  A memoized skeleton loader that renders a placeholder while the NotFoundPage content is loading, ensuring a smooth experience during slow network conditions or data fetches.
- **NotFoundPage.module.scss**:   Styles for the `NotFoundPage`.

### 2. `index.ts`
- Entry point for the `NotFoundPage` module, exporting the components for easy use throughout the application.

## Public API
- **Components**:
    - [**NotFoundPage.tsx**](./ui/README.md): A component displaying a 404 error message, with feature toggling for UI variations.
    - **NotFoundPageSkeleton**: A skeleton loader providing visual feedback during loading states

## Conclusion
The `NotFoundPage`  module is essential for gracefully handling non-existent routes, providing users with a clear, localized 404 message. Its feature-toggling capability ensures that the component can dynamically switch between different UI versions, enhancing adaptability. The inclusion of the NotFoundPageSkeleton ensures a seamless and responsive user experience, even during loading phases, making this module a vital part of the application's error-handling framework.
