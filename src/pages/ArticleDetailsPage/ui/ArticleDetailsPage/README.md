# ArticleDetailsPage

## Overview
The **`ArticleDetailsPage`** module is responsible for presenting a detailed view of an article within the application. Leveraging the Feature-Sliced Design (FSD) methodology, this page module dynamically adapts its interface based on the application’s design system. It utilizes feature flags to conditionally render either the [ArticleDetailsRedesignedPage](ArticleDetailsPageRedesigned/README.md) or the [ArticleDetailsDeprecatedPage](ArticleDetailsPageDeprecated/README.md), ensuring that users receive a consistent and coherent experience depending on the active design configuration.

## Type Definition
```typescript
interface LiveCodeTaskDetailsPageProps {
    className?: string;
}
```
## Props

The **`ArticleDetailsPage`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                             |
|------------|------------|----------------------|-----------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling. |

## Features

1. **Dynamic Rendering**: Utilizes the `ToggleFeaturesComponent` to render either `ArticleDetailsRedesignedPage` or `ArticleDetailsDeprecatedPage` based on the `isAppRedesigned` feature flag, ensuring that the page adapts to the current design system.
2. **Dynamic Reducer Management**: Integrates `DynamicModuleLoader` to manage the `articleDetailsPageReducer` dynamically, optimizing state management and reducing unnecessary bundle size by loading reducers only when required.
3. **Component Memoization**: The `ArticleDetailsPage` is memoized using `React.memo` to optimize rendering performance by preventing unnecessary re-renders.
4. **Lazy Loading**: The `ArticleDetailsPageAsync` component is lazy-loaded to optimize the initial load time of the application, improving performance and user experience.


## ArticleDetailsPage
The `ArticleDetailsPageSkeleton` is a memoized component that renders a skeleton placeholder for the `ArticleDetailsPage`.
This skeleton provides a visual indication to users that content is loading, ensuring a smooth user experience during loading states.


## Conclusion

The **`ArticleDetailsPage`** component is a key page module that delivers a comprehensive and adaptable view of article details. By utilizing feature flags and dynamic reducer management, it ensures that the page remains consistent with the current design standards and optimizes performance. The component's integration of `DynamicModuleLoader` for state management and memoization for performance efficiency makes it a robust and user-friendly solution for presenting article information across various design configurations.
Additionally, the `ArticleDetailsPageSkeleton` component enhances the user experience by providing a visual indication during loading states, ensuring a smooth and responsive interface.
