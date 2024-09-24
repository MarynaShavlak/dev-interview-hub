# Page ArticlesPage Documentation

## Overview

The `ArticlesPage` module is responsible for displaying a comprehensive list of articles within the application. 
Following the Feature-Sliced Design (FSD) methodology, this module dynamically adapts its interface based on the application's design system. 
It leverages feature flags to conditionally render either the [RedesignedArticlesPage](./ui/ArticlesPage/RedesignedArticlesPage/README.md) or the [DeprecatedArticlesPage](./ui/ArticlesPage/DeprecatedArticlesPage/README.md), ensuring that the user interface aligns with the current design configuration. The component is optimized to handle large lists of articles efficiently, employing virtualization techniques to enhance performance and ensure smooth scrolling.


## Module Structure

The `ArticlesPage` module is organized into several directories, each serving a distinct purpose:
```text
ArticlesPage/
├── lib/                                     # Reusable logic and hooks related to the articles page.
│   ├── hooks/                               # Custom hooks for managing various aspects of the articles page.
│   │   └── useArticleFilters/               # Hook for managing article filters.
│   │       └── useArticleFilters.ts
│   │   └── useArticlesPage/                 # Hook for initializing and managing articles page state.
│   │       └── useArticlesPage.ts
│   │   └── useArticlesScroll/               # Hook for handling infinite scrolling behavior.
│   │       └── useArticlesScroll.ts
│   │   └── useGridSkeletonVisibility/       # Hook for showing skeletons while grid content is loading.
│   │       └── useGridSkeletonVisibility.ts
│   │   └── useNoArticlesFound/              # Hook for handling "no articles found" scenarios.
│   │       └── useNoArticlesFound.ts
│   │   └── useVirtuosoGrid/                 # Hook for using the Virtuoso grid for virtualized rendering.
│   │       └── useVirtuosoGrid.ts
├── model/                                   # State management, selectors, and services for the articles page.
│   ├── selectors/                           # Selectors to extract specific data from the articles state.
│   │   └── articlesPageSelectors.ts
│   ├── services/                            # Services related to fetching articles and managing pagination.
│   │   └── fetchArticlesList/               # Service to fetch the list of articles.
│   │       └── fetchArticlesList.ts
│   │   └── fetchNextArticlesPage/           # Service to fetch the next page of articles for infinite scroll.
│   │       └── fetchNextArticlesPage.ts
│   │   └── initArticlesPage/                # Service to initialize the articles page.
│   │       └── initArticlesPage.ts
│   ├── slices/                              # Redux slices for managing the articles page state.
│   │   └── articlesPageSlice.ts
│   └── types/                               # TypeScript types for defining the schema of the articles page.
│       └── articlesPageSchema.ts
├── ui/                                      # UI components and containers for displaying articles and page layouts.
│   ├── ArticleInfiniteList/                 # Component to display an infinite list of articles.
│   │   ├── ArticleInfiniteListError/        # Component to show error messages in the infinite list.
│   │   │   ├── ArticleInfiniteListError.tsx
│   │   ├── DeprecatedArticleInfiniteList/   # Legacy version of the article infinite list component.
│   │   │   ├── DeprecatedArticleInfiniteList.tsx
│   │   ├── RedesignedArticleInfiniteList/   # Redesigned version of the article infinite list component.
│   │   │   ├── RedesignedArticleInfiniteList.tsx
│   │   ├── ArticleInfiniteList.tsx          # Main component for the infinite article list.
│   │   └── ArticleInfiniteList.module.scss  # Styles for the infinite list component.
│   ├── ArticlesPage/                        # Main articles page layout and logic.
│   │   ├── DeprecatedArticlesPage/          # Legacy version of the articles page.
│   │   │   ├── DeprecatedArticlesPage.tsx
│   │   ├── RedesignedArticlesPage/          # Redesigned version of the articles page.
│   │   │   ├── RedesignedArticlesPage.tsx
│   │   ├── ArticlesPage.tsx                 # Core articles page component.
│   │   └── ArticlesPage.module.scss         # Styles for the articles page.
│   ├── ArticlesPageSkeleton/                # Skeleton component for loading state of the articles page.
│   │   ├── ArticlesPageSkeleton.tsx
│   ├── FiltersContainer/                    # Component to hold and manage article filters.
│   │   ├── FiltersContainer.tsx
│   ├── ViewSelectorContainer/               # Component to toggle between different views (e.g., list or grid).
│   │   ├── ViewSelectorContainer.tsx
├── index.ts                                 # Main export file for the articles page module.
└── testing.ts                               # File for testing the articles page functionality.
```
## Public API

- **Types**:
    - `ArticlesPageSchema`: Schema for managing the articles page state.

- **Components**:
    - `ArticlesPage`: Lazy-loaded version of `ArticlesPage`, improving initial load times by loading the component only when needed.
    - `ArticlesPageSkeleton`: A skeleton loader that displays while the settings data is being fetched, ensuring a smooth and visually responsive experience during loading states.

## Public Testing API
- **Testing Exports**:
    - `articlesPageReducer` - Reducer for articles page state management for use in testing scenarios and development tools.


## Conclusion

The `ArticlesPage` module is a vital part of the application, delivering a flexible and adaptive interface for presenting a list of articles. By leveraging feature flags and dynamic reducer management, it ensures that the page remains consistent with the current design standards while optimizing performance. The integration of virtualization techniques, `DynamicModuleLoader` for state management, and `React.memo` for rendering efficiency makes it a robust solution for displaying articles. Additionally, the `ArticlesPageSkeleton` component enhances the user experience by providing a visual placeholder during content loading, ensuring a smooth and responsive interface.
