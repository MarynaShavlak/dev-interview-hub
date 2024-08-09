# ArticlesPage

## Overview
The **`ArticlesPage`** module is responsible for displaying a comprehensive list of articles within the application. Adhering to the Feature-Sliced Design (FSD) methodology, this page module dynamically adapts its interface based on the application's design system. It leverages feature flags to conditionally render either the `RedesignedArticlesPage` or the `DeprecatedArticlesPage`, ensuring that the user interface aligns with the current design configuration.

## Type Definition
```typescript
interface ArticlesPageProps {
    className?: string;
}
```
## Props

The **`ArticlesPage`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                             |
|------------|------------|----------------------|-----------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling. |

## Features

1. **Dynamic Rendering**: Utilizes the `ToggleFeaturesComponent` to render either `RedesignedArticlesPage` or `DeprecatedArticlesPage` based on the `isAppRedesigned` feature flag, ensuring that the page adapts to the current design system.

2. **Dynamic Reducer Management**: Incorporates `DynamicModuleLoader` to manage the `articlesPageReducer` dynamically. The reducer will not be deleted after the `ArticlesPage` component unmounts. This approach allows the reducer to maintain state across different page views and enhances performance by avoiding the need to reinitialize the reducer and its state. This is particularly useful for preserving application state and improving user experience, especially when navigating between different pages that rely on the same state.

3. **Component Memoization**: The `ArticlesPage` component is memoized using `React.memo` to prevent unnecessary re-renders and enhance rendering performance.

4. **Lazy Loading**: The `ArticlesPageAsync` component is lazy-loaded to improve the initial load time of the application, thereby optimizing performance and user experience.

5. **Skeleton Placeholder**: The `ArticlesPageSkeleton` component provides a skeleton UI during loading states, ensuring a smooth user experience by maintaining the layout and appearance of the final content while it is being fetched.

## ArticlesPageSkeleton

The `ArticlesPageSkeleton` component is a memoized placeholder UI for the `ArticlesPage`. It offers a visual indication to users that content is being loaded and ensures a consistent layout and user experience during loading periods.

## Conclusion

The **`ArticlesPage`** component is a vital page module that delivers a flexible and adaptive interface for presenting a list of articles. By leveraging feature flags and dynamic reducer management, it ensures that the page remains consistent with the current design standards while optimizing performance. The integration of `DynamicModuleLoader` for state management and `React.memo` for rendering efficiency makes it a robust solution for displaying articles. Additionally, the `ArticlesPageSkeleton` component enhances user experience by providing a visual placeholder during content loading, ensuring a smooth and responsive interface.
