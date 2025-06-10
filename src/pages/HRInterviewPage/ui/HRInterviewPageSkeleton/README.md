# ArticlesPageSkeleton

## Overview
The **`ArticlesPageSkeleton`** component provides a skeleton placeholder UI for the articles page, offering a visual indication to users that content is loading. It uses the `StickyContentLayout` layout to structure the skeleton elements, which include a left sidebar with view options, a right sidebar with filters, and a full-height content area. This setup ensures a smooth user experience by maintaining the layout and appearance of the final content during loading states.

## Props
The **`ArticlesPageSkeleton`** component does not accept any props.

## Features
1. **Structured Layout**: Utilizes the `StickyContentLayout` to organize the skeleton into a left sidebar, a right filters section, and a full-height content area, mirroring the actual page layout.
2. **Skeleton Elements**: Incorporates `Skeleton` components with varying sizes and shapes, such as circular and rectangular elements, to represent different content types and maintain visual coherence during loading.

## Usage Example
```typescript jsx
import { ArticlesPageSkeleton } from '@/pages/ArticlesPage';

const App = () => (
    <div className="articles-page">
        <ArticlesPageSkeleton />
    </div>
);
```

## Conclusion
The `ArticlesPageSkeleton` component plays a crucial role in providing a placeholder UI for the articles page while content is being loaded. By using the `StickyContentLayout` and incorporating various `Skeleton` elements, it effectively mimics the layout and structure of the final content. This approach enhances the user experience during loading phases by maintaining visual consistency and ensuring that users receive clear feedback while data is being fetched.
