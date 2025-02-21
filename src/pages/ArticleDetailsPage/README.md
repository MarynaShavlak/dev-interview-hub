# Page ArticleDetailsPage Documentation

## Overview
The **`ArticleDetailsPage`**  module is responsible for displaying a detailed view of an article within the application. Designed using the Feature-Sliced Design (FSD) methodology, this module ensures a dynamic, adaptable user experience by leveraging feature flags to toggle between different design versions. It handles state management efficiently using dynamic reducer loading, optimizing performance and user experience.

## Module Structure

The `ArticleDetailsPage`  module is organized into UI components and an entry point, as shown below:
```text
ArticleDetailsPage/
├── model/                                         # Contains logic related to data and state.
│   └── selectors/                                 # Sub-directory for selecting specific data from the state.
│       └── getCanEditArticle.ts                   # Selector to determine if the current user can edit the article.
├── ui/                                            # UI components related to the article details page.
│   ├── AdditionalInfoContainer/                   # Component for displaying additional article info.
│   │   ├── AdditionalInfoContainer.tsx            # Main component for additional information.
│   │   ├── AdditionalInfoContainer.module.scss    # Styling specific to the AdditionalInfoContainer.
│   │   └── AdditionalInfoContainerSkeleton/       # Skeleton loading state for the additional info section.
│   │       └── AdditionalInfoContainerSkeleton.tsx
│   ├── ArticleDetailsPageSkeleton/                # Skeleton component for the entire article details page.
│   │   └── ArticleDetailsPageSkeleton.tsx
│   ├── ArticleDetailsPage/                        # Main component for rendering the article details.
│   │   ├── ArticleDetailsPage.tsx                 # Core component for the page layout and logic.
│   │   ├── ArticleDetailsPage.module.scss         # Styling for the article details page.
│   │   ├── ArticleDetailsPageContainer/           # Container component for wrapping the article details logic.
│   │   │   └── ArticleDetailsPageContainer.tsx
│   │   ├── ArticleDetailsDeprecatedPage/          # Legacy version of the article details page.
│   │   │   └── ArticleDetailsPageHeader/          # Header component for the deprecated version.
│   │   │       └── ArticleDetailsPageHeader.tsx
│   │   │   └── ArticleDetailsDeprecatedPage.tsx   # Main file for the deprecated page.
│   │   └── ArticleDetailsRedesignedPage/          # Updated, redesigned version of the article details page.
│   │       └── ArticleDetailsRedesignedPage.tsx
├── index.ts                                       # Entry point of the module.
```
## Public API
- **Components**:
    - [**ArticleDetailsPage.tsx**](./ui/ArticleDetailsPage/README.md): Lazy-loaded version of `ArticleDetailsPage`, improving initial load times by loading the component only when needed.
    - [**ArticleDetailsPageSkeleton.tsx**](./ui/ArticleDetailsPageSkeleton/README.md):  A skeleton loader that displays while the settings data is being fetched, ensuring a smooth and visually responsive experience during loading states.

## Conclusion
The `ArticleDetailsPage` module is a versatile and essential part of the application, offering a detailed view of articles with support for both legacy and redesigned interfaces. By incorporating dynamic reducer management, feature flag-based rendering, and performance optimizations like memoization and lazy loading, it ensures a seamless, efficient, and user-friendly experience. Additionally, the use of skeleton loaders enhances the responsiveness of the interface during loading states, further improving the user experience.
