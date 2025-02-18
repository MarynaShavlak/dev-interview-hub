# DeprecatedArticleDetails

## Overview
The **`DeprecatedArticleDetails`** component provides a detailed view of an article using deprecated UI elements. It displays the article's avatar, title, subtitle, view count, creation date, and content blocks. This component is designed to deliver a consistent presentation of article details using legacy design elements while the new design system is being integrated.

Additionally, the component handles different states of data fetching:
- **Loading State**: Displays the `ArticleDetailsSkeleton` component while article data is being fetched, offering a placeholder UI to improve user experience during loading.
- **Error State**: Shows the `ArticleDetailsError` component if an error occurs during data retrieval, providing feedback to the user.

## Features
1. **Legacy Design Integration**: Utilizes deprecated UI components such as `Avatar`, `Icon`, and `Text` to present article details, maintaining a consistent look and feel with the older design system.
2. **Article Data Display**: Shows key article information including the article's image, title, subtitle, view count, and creation date, providing a comprehensive overview of the article.
3. **Content Blocks Rendering**: Leverages the `renderArticleBlock` function to dynamically render the article's content blocks, ensuring that various types of content are displayed correctly.
4. **Loading and Error States**:
    - **Loading State**: Uses the `ArticleDetailsSkeleton` component to display a placeholder UI while article data is loading, enhancing user experience by indicating that content is being fetched.
    - **Error State**: Displays the `ArticleDetailsError` component if an error occurs during data retrieval, giving users feedback and allowing for error handling.

## Usage Example
```typescript jsx
import { DeprecatedArticleDetails } from '@/entities/Article';

const App = () => (
    <div className="article-details">
        <DeprecatedArticleDetails />
    </div>
);
```

## Conclusion
The `DeprecatedArticleDetails` component is essential for presenting detailed article information using legacy design elements. By integrating deprecated UI components and handling different data states with `ArticleDetailsSkeleton` and `ArticleDetailsError`, it ensures a consistent user experience with older design standards while the transition to new design paradigms is underway. This approach supports the application's gradual evolution, maintaining user engagement and visual coherence during the design transition, and effectively addresses loading and error scenarios for a smoother user experience.
