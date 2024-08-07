# ArticleDetailsSkeleton

## Overview
The **`ArticleDetailsSkeleton`** component provides a placeholder UI for article details while data is being fetched. It dynamically switches between redesigned and deprecated skeleton styles based on the `isAppRedesigned` feature flag. This component ensures a consistent and visually appropriate loading experience, reflecting the current design standards of the application and giving users a preview of the content structure.

## Features
1. **Feature Flag Driven**: Utilizes the `ToggleFeaturesComponent` to switch between redesigned and deprecated skeleton views based on the `isAppRedesigned` feature flag, aligning with the application's design system.
2. **Dynamic Skeleton Rendering**: Includes separate skeleton layouts for redesigned and deprecated styles, providing visual feedback that matches the current design approach.
3. **Consistent Layout**: Maintains a consistent layout for article details during loading phases, ensuring that the placeholder reflects the structure of the actual content.

## Usage Example
```typescript jsx
import { ArticleDetailsSkeleton } from '@/entities/Article';

const App = () => (
    <div className="article-details">
        <ArticleDetailsSkeleton />
    </div>
);
```

## Conclusion
The `ArticleDetailsSkeleton` component is crucial for rendering a loading state for article details, offering flexibility between redesigned and deprecated styles based on the `isAppRedesigned` feature flag. 
By providing a skeleton that reflects the actual content layout, it enhances the user experience during data loading phases, ensuring visual consistency and engagement. 
The component effectively supports the transition between design paradigms, maintaining a high level of detail and user interaction. 
The `ArticleDetailsSkeleton` component thus plays a vital role in ensuring a seamless and visually appealing loading experience, regardless of the application's design state.
