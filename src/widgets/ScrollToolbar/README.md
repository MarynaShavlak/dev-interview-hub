# Widget ScrollToolbar Documentation

## Overview

The `ScrollToolbar` module provides a central toolbar with a built-in ScrollToTopButton, offering users an intuitive and efficient way to scroll back to the top of the page. It is particularly useful on pages with extensive content, ensuring that the navigation remains consistent and easily accessible. The toolbar is centrally positioned within its container, enhancing user experience by providing a visually prominent and functional interface element.

## Module Structure

The `ScrollToolbar`  module is organized into UI components and an entry point for the module.
```text
ScrollToolbar/
├── ui/
│   └── ScrollToolbar/
│       └── ScrollToolbar.module.scss
│       └── ScrollToolbar.tsx
└── index.ts
```

## Detailed Description

### 1. `ui/`: UI components
- **`ScrollToolbar/`**:
    - [**ScrollToolbar.tsx**](./ui/ScrollToolbar/README.md): The main component responsible for rendering the toolbar, including the `ScrollToTopButton`. It utilizes layout components to center the toolbar within its container, ensuring a user-friendly experience.
    - **ScrollToolbar.module.scss**: Styles for the `ScrollToolbar` component.

### 2. `index.ts`
- Entry point for the `ScrollToolbar` module, exporting the  component for easy use throughout the application.

## Public API
- **Components**:
    - `ScrollToolbar`: A central toolbar that contains a `ScrollToTopButton`, providing users with a quick way to scroll to the top of the page.
## Conclusion
The `ScrollToolbar` module enhances user navigation by providing a centrally positioned toolbar with a `ScrollToTopButton`. Its design ensures that users can easily and efficiently return to the top of the page, especially on content-heavy pages. The combination of a centered layout and integrated scroll functionality makes this module a valuable addition to any application that requires effective scroll management and user-friendly navigation tools.
