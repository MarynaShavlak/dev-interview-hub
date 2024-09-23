# Widget PageLoader Documentation

## Overview

The `PageLoader` module provides a widget for displaying a loading spinner, indicating that a page or section of the application is currently in the process of loading. This widget is essential for enhancing the user experience during asynchronous operations such as data fetching or intensive processing tasks. By offering visual feedback, the `PageLoader` reduces perceived wait times and ensures a more responsive interface.

## Module Structure

The `PageLoader`  module is organized into UI components and an entry point for the module.
```text
PageLoader/
├── ui/
│   └── PageLoader/
│       ├── PageLoader.tsx
│       └── PageLoader.module.scss
└── index.ts
```

## Detailed Description

### 1. `ui/`: UI components
- **`PageLoader/`**:
    - [**PageLoader.tsx**](./ui/PageLoader/README.md): The primary component responsible for rendering the loading spinner. 
    - **PageLoader.module.scss**: Styles for the `PageLoader` component.

### 2. `index.ts`
- Entry point for the `PageLoader` module, exporting the  component for easy use throughout the application.

## Public API
- **Components**:
    - `PageLoader`: A widget that displays a loading spinner to indicate that content is currently loading.
## Conclusion
The `PageLoader` module is a key widget for managing loading states within an application. By offering a clear and centralized loading spinner through its integration with the Loader and VStack components, it improves the overall user experience during asynchronous operations. Its ability to toggle styles based on feature flags ensures it remains adaptable to different design requirements, making it a valuable asset in any application requiring efficient handling of loading states.
