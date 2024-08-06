# CommentCardSkeleton

## Overview
The **`CommentCardSkeleton`** component is a placeholder used to indicate loading states for comment card data in a React application. It provides a visual representation of the comment card's structure while the actual data is being fetched or processed. This component ensures a seamless user experience by preventing layout shifts and offering a consistent placeholder during data loading. It supports feature toggling to switch between redesigned and deprecated skeleton styles based on application feature flags.

## Type Definition
```typescript
interface CommentCardSkeletonProps {
   className?: string;
}
```

## Props

The **`CommentCardSkeleton`** component accepts the following props:

| Prop       | Type                           | Required / Optional | Description                                          |
|------------|--------------------------------|----------------------|------------------------------------------------------|
| `className`| `string`                        | Optional             | Custom class name for additional styling.            |


## Features
1. **Dynamic Skeleton Styles**:  Utilizes the `toggleFeatures` function to conditionally render either the redesigned or deprecated skeleton styles based on the `isAppRedesigned` feature flag. This ensures the skeleton component aligns with the current design standards of the application.
2. **Consistent Placeholder**: Provides a consistent loading placeholder for comment cards, including a circular avatar and text blocks, to simulate the final content layout and enhance user experience during data fetching.

## Usage Example
```typescript jsx
import { CommentCardSkeleton } from '@/entities/Comment';

const ExampleComponent = () => {
   // Simulate loading state
   const isLoading = true;

   return (
           <div>
              {isLoading ? (
                      <CommentCardSkeleton className="customCommentCardSkeleton" />
              ) : (
                      // Render actual CommentCard component here
              )}
           </div>
   );
};
```
## Conclusion
The **`CommentCardSkeleton`** component is an essential UI element for providing a smooth user experience during data loading phases. By integrating feature toggling and maintaining visual consistency with the actual comment card layout, it helps improve the application's overall usability and aesthetic appeal.
