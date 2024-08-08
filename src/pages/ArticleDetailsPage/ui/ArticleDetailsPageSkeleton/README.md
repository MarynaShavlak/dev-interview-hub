# ArticleDetailsPageSkeleton

## Overview
The **`ArticleDetailsPageSkeleton`** component provides a skeleton placeholder UI for the article details page, offering a visual indication to users that content is loading. It uses the `StickyContentLayout` layout to structure the skeleton elements, which include a left sidebar, a right additional info section, and a full-height content area. This setup ensures a smooth user experience by maintaining the layout and appearance of the final content during loading states.

## Props
The **`ArticleDetailsPageSkeleton`** component does not accept any props.

## Features
1. **Structured Layout**: Utilizes the `StickyContentLayout` to organize the skeleton into a left sidebar, a right additional info section, and a full-height content area, mirroring the actual page layout.
2. **Skeleton Elements**: Incorporates `Skeleton` components with varying sizes and shapes, such as circular and rectangular elements, to represent different content types and maintain visual coherence during loading.
3. **Responsive Design**: Ensures that the skeleton adapts to different screen sizes and container widths, providing a consistent and responsive user experience.

## Usage Example
```typescript jsx
import { ArticleDetailsPageSkeleton } from '@/pages/ArticleDetailsPage';

const App = () => (
    <div className="article-details-page">
        <ArticleDetailsPageSkeleton />
    </div>
);
```
## Conclusion
The `ArticleDetailsPageSkeleton` component plays a crucial role in providing a placeholder UI for the article details page while content is being loaded. By using the `StickyContentLayout` and incorporating various `Skeleton` elements, it effectively mimics the layout and structure of the final content. This approach enhances the user experience during loading phases by maintaining visual consistency and ensuring that users receive clear feedback while data is being fetched.
