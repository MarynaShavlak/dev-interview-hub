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

1. **Legacy Design Support**: Retains the legacy styling and components to provide a familiar interface for users who are accustomed to the older design. This ensures a smooth transition experience until the application is fully migrated to the redesigned interface.
2. **Dynamic Article List Display**: Utilizes the `ArticleInfiniteList` component to render a dynamically loaded, scrollable list of articles. This feature is crucial for efficiently managing large volumes of content, providing users with a seamless browsing experience through lazy loading and optimized scrolling.
3. **Efficient Data Fetching**: Implements the `useArticleListFetcher` hook to manage the fetching and loading of additional articles as the user scrolls. This hook efficiently handles the retrieval of new data, ensuring a smooth user experience by preloading content before the user reaches the end of the list.
4. **Article Page Greeting**: Includes the `ArticlePageGreeting` feature, which provides a welcoming message or introductory content to users when they first access the page, enhancing user engagement.
5. **Dynamic Reducer Management**: Utilizes `DynamicModuleLoader` to manage the `articlesPageReducer` dynamically. This ensures that the reducer is only loaded when the articles page  is needed, thereby optimizing state management and reducing the overall bundle size.


## Conclusion
The `DeprecatedArticlesPage` serves as an interim solution for applications that have not yet adopted the modern UI components. It ensures that article viewing remains functional and consistent with the old design. As the `isAppRedesigned` feature flag becomes active, this component will be phased out in favor of the `RedesignedArticlesPage`, which will offer enhanced features, modern styling, and an improved user experience.
