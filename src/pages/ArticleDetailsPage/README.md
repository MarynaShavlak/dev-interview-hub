# ArticleDetailsPage

## Overview
The **`ArticleDetailsPage`** module is responsible for presenting a detailed view of an article within the application. Leveraging the Feature-Sliced Design (FSD) methodology, this page module dynamically adapts its interface based on the application’s design system. It utilizes feature flags to conditionally render either the `RedesignedArticleDetailsPage` or the `DeprecatedArticleDetailsPage`, ensuring that users receive a consistent and coherent experience depending on the active design configuration.

## Type Definition
```typescript
interface ArticleDetailsPageProps {
    className?: string;
}
```
## Props

The **`ArticleDetailsPage`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                             |
|------------|------------|----------------------|-----------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling. |

## Features

1. **Dynamic Rendering**: Utilizes the `ToggleFeaturesComponent` to render either `RedesignedArticleDetailsPage` or `DeprecatedArticleDetailsPage` based on the `isAppRedesigned` feature flag, ensuring that the page adapts to the current design system.

2. **Dynamic Reducer Management**: Integrates `DynamicModuleLoader` to manage the `articleDetailsPageReducer` dynamically, optimizing state management and reducing unnecessary bundle size by loading reducers only when required.


## Conclusion

The **`ArticleDetailsPage`** component is a key page module that delivers a comprehensive and adaptable view of article details. By utilizing feature flags and dynamic reducer management, it ensures that the page remains consistent with the current design standards and optimizes performance. The component's integration of `DynamicModuleLoader` for state management and memoization for performance efficiency makes it a robust and user-friendly solution for presenting article information across various design configurations.
