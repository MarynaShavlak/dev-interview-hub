# Feature ArticleViewSelector  Documentation

## Overview

The `ArticleViewSelector` module provides a flexible and intuitive interface for users to select different viewing options for articles, enhancing the reading experience. It supports various layouts and configurations, allowing users to customize how they interact with content. This module integrates smoothly with the application's state management, ensuring that user preferences are preserved and easily accessible.

## Module Structure

The `ArticleViewSelector` module is organized into several subdirectories, each playing a unique role in managing article view configurations.

```text
ArticleViewSelector/
├── model/
│   ├── consts/
│   │   └── viewsTypes.ts
├── ui/
│   ├── ArticleViewSelector/
│   │   ├── ArticleViewSelector.tsx
│   │   ├── ArticleViewSelector.module.scss
│   │   ├── DeprecatedArticleViewSelector/
│   │   │   └── DeprecatedArticleViewSelector.tsx
│   │   └── ArticleViewSelectorRedesigned/
│   │       └── ArticleViewSelectorRedesigned.tsx
└── index.ts
```
## Detailed Description

### 1. `model/`: Core logic and data structures
- **`consts/`**
    - [**viewsTypes.ts**](./model/consts/viewsTypes.ts): Defines const for view configurations for articles.
### 2. `ui/`: UI components

- **`ArticleViewSelector/`**
    - [**ArticleViewSelector.tsx**](./ui/ArticleViewSelector/README.md): The main component that renders the view selector interface, allowing users to switch between different article layouts.
    - **ArticleViewSelector.module.scss**: Styles for the `ArticleViewSelector` component.
    - **`DeprecatedArticleViewSelector/`**:
        - [**DeprecatedArticleViewSelector.tsx**](ui/ArticleViewSelector/ArticleViewSelectorDeprecated/README.md): A legacy version of the article view selector for backward compatibility.
    - **`ArticleViewSelectorRedesignedHeader/`**:
        -  [**ArticleViewSelectorRedesigned.tsx**](ui/ArticleViewSelector/ArticleViewSelectorRedesigned/README.md): A modernized version of the selector, featuring updated designs and improved functionality.

### 3. `index.ts`
- Entry point for the `ArticleViewSelector` module, exporting components, functions, and types.

## Public API
- **Components**:
    - `ArticleViewSelector`: Component for selecting article views, offering a user-friendly interface for layout customization.

## Conclusion
The `ArticleViewSelector` module offers a streamlined and customizable solution for managing article viewing preferences. By providing multiple layout options and ensuring seamless integration with the application's state management, it enhances the user experience significantly. This module's design promotes flexibility and responsiveness, making it a valuable addition to any content-driven application.
