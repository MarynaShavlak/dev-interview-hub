# Widget ArticlesFilters Documentation

## Overview

The `ArticlesFilters` widget provides a dynamic filtering interface for articles, adapting between modern and legacy UI designs based on the `isAppRedesigned` feature flag. 
By leveraging this flag, the component ensures a flexible and consistent user experience, regardless of whether users interact with the legacy (`DeprecatedArticlesFilters`) or the modern (`ArticlesFiltersRedesigned`) version of the interface. 
This approach allows for a seamless transition between design systems while maintaining essential filtering functionalities.

## Module Structure
The ArticlesFilters module consists of two major components: the legacy `DeprecatedArticlesFilters` and the modern `ArticlesFiltersRedesigned`, with a central component (`ArticlesFilters`) responsible for dynamically switching between the two based on feature flags.
```text
ArticlesFilters/
├── ui/
│   ├── DeprecatedArticlesFilters/
│   │   └── DeprecatedArticlesFilters.tsx
│   ├── ArticlesFiltersRedesigned/
│   │   └── ArticlesFiltersRedesigned.tsx
│   ├── ArticlesFilters.tsx
│   └── ArticlesFilters.module.scss
└── index.ts
```

## Detailed Description

### 1. `ui/`: UI components
- **`ArticlesFilters/`**:
    - [**ArticlesFilters.tsx**](./ui/ArticlesFilters/README.md): The main component that dynamically switches between the `ArticlesFiltersRedesigned` and `DeprecatedArticlesFilters` based on the `isAppRedesigned` feature flag. It ensures that the appropriate filtering interface is presented to users depending on the feature configuration.
- **`DeprecatedArticlesFilters/`**:
  -  [DeprecatedArticlesFilters.tsx:](ui/ArticlesFilters/ArticlesFiltersDeprecated/README.md) A legacy filtering interface that provides users with basic filtering functionalities, such as sorting options, search input, and category tabs. It serves as a transitional component for users still interacting with the legacy version of the application.
- **`ArticlesFiltersRedesigned/`**:
  - [ArticlesFiltersRedesigned.tsx](ui/ArticlesFilters/ArticlesFiltersRedesigned/README.md): A modernized filtering interface offering enhanced user experience and updated UI elements for sorting, searching, and category filtering. This component represents a significant upgrade in both design and functionality compared to the deprecated version.

### 2. `index.ts`
- Entry point for the `ArticlesFilters` module, exporting the  component for easy use throughout the application.

## Public API
- **Components**:
    - `ArticlesFilters`: A widget that dynamically switches between the modern and legacy filtering interfaces for articles, based on the `isAppRedesigned` feature flag.
## Conclusion
The `ArticlesFilters` module plays a crucial role in delivering a flexible and adaptive article filtering experience. By dynamically switching between the `ArticlesFiltersRedesigned` and `DeprecatedArticlesFilters` components based on the `isAppRedesigned` feature flag, the widget ensures a consistent and intuitive user experience. Whether users are interacting with the modern or legacy filtering interface, they have access to essential functionalities like sorting, searching, and category filtering, maintaining high usability across different design paradigms. This adaptability makes `ArticlesFilters` an essential component for evolving user interfaces while maintaining continuity in the article browsing experience.
