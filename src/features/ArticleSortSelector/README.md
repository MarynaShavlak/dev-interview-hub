# Feature ArticleSortSelector  Documentation

## Overview

The `ArticleSortSelector` module provides a flexible and intuitive interface for users to sort articles based on different criteria, such as date, popularity, or alphabetical order. It ensures that users can easily control how articles are displayed, enhancing the overall user experience by allowing for customized sorting options. This module integrates seamlessly with the application’s state management and supports multiple design variations for legacy and modern interfaces.

## Module Structure

The `ArticleSortSelector` module is organized into several subdirectories, each playing a unique role in managing article sort configurations.

```text
ArticleSortSelector/
├── lib/
│   └── hooks/
│       └── useOptions.ts
├── ui/
│   ├── ArticleSortSelector/
│   │   ├── ArticleSortSelector.tsx
│   │   ├── ArticleSortSelector.module.scss
│   │   ├── DeprecatedArticleSortSelector/
│   │   │   └── DeprecatedArticleSortSelector.tsx
│   │   └── RedesignedArticleSortSelector/
│   │       └── RedesignedArticleSortSelector.tsx
└── index.ts
```
## Detailed Description

### 1. `lib/`: Utility functions and hooks.
- **`hooks/`**
    - [**useOptions.ts**](lib/hooks/useOptions/useOptions.ts): Retrieves sorting order options for articles.
### 2. `ui/`: UI components

- **`ArticleSortSelector/`**
    - [**ArticleSortSelector.tsx**](./ui/ArticleSortSelector/README.md): The main component that renders the sort selector interface, allowing users  to sort articles by different fields and order
    - **ArticleSortSelector.module.scss**: Styles for the `ArticleSortSelector` component.
    - **`DeprecatedArticleSortSelector/`**:
        - [**DeprecatedArticleSortSelector.tsx**](ui/ArticleSortSelector/ArticleSortSelectorDeprecated/README.md): A legacy version of the article sort selector for backward compatibility.
    - **`RedesignedArticleSortSelectorHeader/`**:
        -  [**RedesignedArticleSortSelector.tsx**](ui/ArticleSortSelector/ArticleSortSelectorRedesigned/README.md): A modernized version of the selector, featuring updated designs and improved functionality.

### 3. `index.ts`
- Entry point for the `ArticleSortSelector` module, exporting components, functions, and types.

## Public API
- **Components**:
    - `ArticleSortSelector`: Component for selecting article sort options , offering a user-friendly interface for layout customization.

## Conclusion
The `ArticleSortSelector` module offers a comprehensive solution for managing article sorting preferences. By supporting multiple sorting options and providing a clean, modern interface, it enhances the user experience significantly. With its modular design, this feature can be easily adapted to different user interfaces and extended for future needs. The module's flexible architecture ensures seamless integration into any article-based platform, making it a crucial tool for improving content navigation and accessibility.
