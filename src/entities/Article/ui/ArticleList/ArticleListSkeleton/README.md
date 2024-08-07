# ArticleListSkeleton

## Overview
The **`ArticleListSkeleton`** component renders a placeholder skeleton UI for a list of articles, dynamically switching between redesigned and deprecated styles based on the `isAppRedesigned` feature flag. It supports different layouts (list or grid) and provides a visual representation of article items while data is being fetched, enhancing the user experience during loading states by indicating the structure and spacing of content.

## Type Definition
```typescript
export interface ArticleListSkeletonProps {
    view: ArticleView;
}
```

## Props
The **`ArticleListSkeleton`** component accepts the following props:

| Prop        | Type       | Required / Optional | Description                                                               |
|-------------|------------|----------------------|---------------------------------------------------------------------------|
| `view`      | `ArticleView`   | Required             | Specifies the layout view for the article (list or grid). |

## Features
1. **Feature Flag Driven**: Adapts between redesigned and deprecated skeleton styles based on the `isAppRedesigned` feature flag, ensuring alignment with current design standards.
2. **Dynamic Layouts**: Supports both list and grid layouts by rendering skeletons in the appropriate format based on the `view` prop, maintaining consistency with the actual content layout.
3. **Adaptive Skeleton Rendering**: Utilizes the `getSkeletons` function to determine the number of skeleton items based on the layout type, ensuring proper visual feedback during data loading.

## Usage Example
```typescript jsx
import { ArticleListSkeleton } from '@/entities/Article';
import { ArticleView } from '@/model/consts/articleConsts';

const App = () => (
    <div className="article-list">
        <ArticleListSkeleton view={ArticleView.LIST} />
        <ArticleListSkeleton view={ArticleView.GRID} />
    </div>
);
```
## Conclusion
The `ArticleListSkeleton` component is essential for providing a visual placeholder for a list of articles during data fetching, adapting seamlessly to both modern and legacy design systems. 
By leveraging the `isAppRedesigned` feature flag, it ensures that users receive consistent and visually appropriate feedback, regardless of the design state of the application. This component enhances the user experience during loading phases by maintaining the layout and structure of content, while also supporting smooth transitions between different design paradigms. 
The `ArticleListSkeleton` component thus plays a critical role in maintaining engagement and visual consistency during content loading.
