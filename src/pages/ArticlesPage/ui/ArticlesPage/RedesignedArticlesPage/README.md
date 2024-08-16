# RedesignedArticlesPage

## Overview

The **`RedesignedArticlesPage`** component presents a modernized interface for viewing articles, utilizing updated UI components and styling. It is designed for applications that have adopted the new design standards, offering an enhanced user experience with a fresh layout and improved functionality. This component will replace the `DeprecatedArticlesPage` when the feature flag `isAppRedesigned` is active.

## Type Definition

```typescript
interface ArticlesPageProps {
    className?: string;
}
```
## Props
The **`RedesignedArticlesPage`** component accepts the following props:

| Prop        | Type     | Required / Optional | Description                             |
|-------------|----------|---------------------|-----------------------------------------|
| `className` | `string` | Optional            | Custom class name for additional styling. |

## Features

1. **Modern Layout**: Utilizes the `StickyContentLayout` component to provide a sophisticated layout with sticky sidebars for the `ViewSelectorContainer` and `FiltersContainer`, enhancing user accessibility and interaction.

2. **Article List Display**: Employs the `RedesignedArticleInfiniteList` component to present articles in a dynamic, scrollable list format with lazy loading, improving data fetching efficiency.

3. **Enhanced Page Layout**: Uses the `Page` component to ensure a consistent and modern page layout, aligning with the new design standards.

4. **User Interface Controls**: Incorporates `FiltersContainer` and `ViewSelectorContainer` components for users to easily filter and select different viewing options for articles, offering greater flexibility and control.

5. **Performance Optimization**: Optimized for performance with efficient scrolling and data fetching mechanisms, providing a smooth and responsive user experience.


## Conclusion
The `RedesignedArticlesPage` represents a significant advancement in the application’s user interface, delivering a modern and enhanced experience for viewing articles. It features updated design elements and improved functionality to better serve users and provide a more engaging interaction. This component marks the transition from the `DeprecatedArticlesPage` to a more refined and user-centric interface, reflecting the application's commitment to continuous improvement and user satisfaction.
