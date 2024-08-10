# ArticleListSkeleton

## Overview
The **`ArticleListSkeleton`** component renders a placeholder skeleton UI for a list of articles, dynamically switching between redesigned and deprecated styles based on the `isAppRedesigned` feature flag.
It supports both list and grid layouts, rendering a configurable number of skeleton items to visually represent the structure and spacing of content while data is being fetched. This enhances the user experience by providing a clear indication of where content will appear, maintaining engagement during loading states.
## Type Definition
```typescript
export interface ArticleListSkeletonProps {
    view: ArticleView;
    skeletonCount?: number;
}
```

## Props
The **`ArticleListSkeleton`** component accepts the following props:

| Prop        | Type          | Required / Optional | Description                                                               |
|-------------|---------------|---------------------|---------------------------------------------------------------------------|
| `view`      | `ArticleView` | Required            | Specifies the layout view for the article (list or grid). |
| `skeletonCount`      | `number`      | Optional            | Determines the number of skeleton items to render; defaults to 9 for grid view and 3 for list view. |

## Features
1. **Feature Flag Driven**: Adapts between redesigned and deprecated skeleton styles based on the `isAppRedesigned` feature flag, ensuring alignment with current design standards.
2. **Dynamic Layouts**: Supports both list and grid layouts by rendering skeletons in the appropriate format based on the `view` prop, maintaining consistency with the actual content layout.
3. **Configurable Skeleton Count**: The `skeletonCount` prop allows customization of the number of skeleton items rendered. If not provided, it defaults to 9 items for grid view and 3 items for list view, ensuring appropriate visual feedback during data loading.

## Usage Example
```typescript jsx
import { ArticleListSkeleton } from '@/entities/Article';
import { ArticleView } from '@/model/consts/articleConsts';

const App = () => (
    <div className="article-list">
        <ArticleListSkeleton view={ArticleView.LIST} />
        <ArticleListSkeleton view={ArticleView.GRID} />
        <ArticleListSkeleton view={ArticleView.GRID} skeletonCount={6} />
    </div>
);
```
## Conclusion
The `ArticleListSkeleton` component is a crucial tool for providing a visual placeholder for a list of articles during data fetching, adapting seamlessly to both modern and legacy design systems. By leveraging the `isAppRedesigned` feature flag, it ensures that users receive consistent and visually appropriate feedback, regardless of the design state of the application. The component's ability to support different layouts and a customizable number of skeleton items makes it highly versatile, enhancing the user experience during loading phases by maintaining the expected layout and structure of content.
