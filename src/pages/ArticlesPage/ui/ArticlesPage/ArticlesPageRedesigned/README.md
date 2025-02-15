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

1. **Modern Layout**: Utilizes the `StickyContentLayout` component to create a sophisticated layout, featuring sticky sidebars for the `ViewSelectorContainer` and `FiltersContainer`. This design enhances accessibility and ensures that essential controls remain visible as users scroll through the content.
2. **Dynamic Article List Display**: Utilizes the `ArticleInfiniteList` component to render a dynamically loaded, scrollable list of articles. This feature is crucial for efficiently managing large volumes of content, providing users with a seamless browsing experience through lazy loading and optimized scrolling.
3. **Efficient Data Fetching**: Implements the `useArticleListFetcher` hook to manage the fetching and loading of additional articles as the user scrolls. This hook efficiently handles the retrieval of new data, ensuring a smooth user experience by preloading content before the user reaches the end of the list.
4. **User Interface Controls**: Integrates the `FiltersContainer` and `ViewSelectorContainer` components, enabling users to filter and choose different viewing options for the articles. This enhances user control and personalization, allowing for a tailored content viewing experience.
5. **Article Page Greeting**: Includes the `ArticlePageGreeting` feature, which provides a welcoming message or introductory content to users when they first access the page, enhancing user engagement.
6. **Dynamic Reducer Management**: Utilizes `DynamicModuleLoader` to manage the `articlesPageReducer` dynamically. This ensures that the reducer is only loaded when the articles page  is needed, thereby optimizing state management and reducing the overall bundle size.


## Conclusion

The `RedesignedArticlesPage` is a significant upgrade to the application's article viewing interface, offering a refined and user-centric experience. 
It incorporates modern design principles, advanced UI components, and performance optimizations, including the efficient data-fetching mechanism provided by the `useArticleListFetcher` hook. This component represents the future of the application's user interface, ensuring that users have access to a cutting-edge platform for consuming content.
