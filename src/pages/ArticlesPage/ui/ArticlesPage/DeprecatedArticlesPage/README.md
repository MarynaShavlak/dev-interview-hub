# DeprecatedArticlesPage

## Overview

The **`DeprecatedArticlesPage`** component displays a list of articles using legacy UI components and styling. It is designed for applications that are yet to transition to the updated design provided by the `RedesignedArticlesPage`. This component ensures a consistent user experience with the old design until the feature flag `isAppRedesigned` is activated, at which point users will be seamlessly transitioned to the newer design.

## Type Definition

```typescript
interface ArticlesPageProps {
    className?: string;
}
```
## Props
The **`DeprecatedArticlesPage`** component accepts the following props:

| Prop        | Type     | Required / Optional | Description                             |
|-------------|----------|---------------------|-----------------------------------------|
| `className` | `string` | Optional            | Custom class name for additional styling. |

## Features

1. **Article List Display**: Utilizes the `ArticleInfiniteList` component to present articles in a scrollable list format, supporting lazy loading for efficient data fetching.

2.  **Layout Consistency**: Incorporates the `Page` component to maintain a consistent page layout, ensuring uniformity across various sections of the application.

3.  **User Interface Controls**: Includes `FiltersContainer` and `ViewSelectorContainer` components for users to filter and select different viewing options for articles.

4.  **Performance Optimization**: Optimized for performance with efficient handling of scrolling and data fetching, ensuring smooth user interactions.

5. **Legacy Design Support**: Maintains legacy styling and components to provide a familiar interface for users until the transition to the redesigned page.


## Conclusion
The `DeprecatedArticlesPage` serves as an interim solution for applications that have not yet adopted the modern UI components. It ensures that article viewing remains functional and consistent with the old design. As the `isAppRedesigned` feature flag becomes active, this component will be phased out in favor of the `RedesignedArticlesPage`, which will offer enhanced features, modern styling, and an improved user experience.
