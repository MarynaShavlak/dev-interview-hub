# DeprecatedArticleDetailsPage

## Overview
The **`DeprecatedArticleDetailsPage`** component is used to render detailed information about articles using outdated styling and components. It is intended for applications that have not yet transitioned to newer UI designs, providing users with a consistent, albeit older, interface for viewing article content. This component will eventually be replaced by the `RedesignedArticleDetailsPage` when the feature flag `isAppRedesigned` is active.

## Type Definition
```typescript
interface ArticleDetailsPageProps {
    className?: string;
}
```

## Props
The **`DeprecatedArticleDetailsPage`** component accepts the following props:

| Prop        | Type     | Required / Optional | Description                             |
|-------------|----------|---------------------|-----------------------------------------|
| `className` | `string` | Optional            | Custom class name for additional styling. |

## Features
1. **Basic Article Details Display**: Utilizes the `ArticleDetailsPageContainer` component to render the content of the selected article within a simple layout.

2. **Consistent Layout**: Uses the `Page` component to maintain a uniform layout across different pages, aligning with the overall design consistency of the application.

3. **Component Memoization**: The `DeprecatedArticleDetailsPage` is memoized using `React.memo`, ensuring that the component only re-renders when its props change, providing basic performance optimizations.

## Conclusion
The `DeprecatedArticleDetailsPage` continues to serve applications that have not yet adopted the newer UI standards, ensuring that article details are accessible through a familiar layout. However, as the application evolves and the `isAppRedesigned` feature flag becomes active, this component should be phased out in favor of the `RedesignedArticleDetailsPage`. Transitioning to the new implementation will provide enhanced features, modern styling, and improved user experience.
