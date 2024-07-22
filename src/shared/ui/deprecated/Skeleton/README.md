# Skeleton ( Deprecated)

Note: This component is deprecated. Please use the new component from the redesigned directory.
## Overview
The `Skeleton` component is a versatile and customizable placeholder component designed to enhance the user experience during data loading states in a React project. It provides developers with an easy way to display skeleton screens, giving a visual cue that content is being loaded and improving the perceived performance of the application.

## Type Definitions
The types used in the `Skeleton` component are defined as follows:
```typescript
interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}
```
## Props
The `Skeleton` component accepts the following props:

| Prop        | Type                      | Required / Optional | Description                                       |
|-------------|---------------------------|:-------------------:|---------------------------------------------------|
| `className` | `string`                  | Optional            | Additional custom class names to style the skeleton. |
| `height`    | `string` or `number`      | Optional            | Specifies the height of the skeleton.             |
| `width`     | `string` or `number`      | Optional            | Specifies the width of the skeleton.              |
| `border`    | `string`                  | Optional            | Determines the border radius of the skeleton.              |


## Usage Examples
### Example 1: Basic Skeleton takes the full width of container 
```jsx
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const BasicSkeletonExample = () => (
    <Skeleton width="100%" height="50px" />
);
```

### Example 2: Skeleton with Custom Border Radius
```jsx
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const CustomBorderRadiusSkeletonExample = () => {
    return (
        <Skeleton width="80px" height="50px" border="10px" />
    );
};
```
## Conclusion 
The `Skeleton` component is an essential tool for improving user experience during data loading states in React applications. Its flexibility in customizing dimensions, border radius, and styling ensures that it can seamlessly fit into any design system. By providing a visual placeholder, the `Skeleton` component helps maintain a smooth and engaging user interface, even when content is being loaded.
