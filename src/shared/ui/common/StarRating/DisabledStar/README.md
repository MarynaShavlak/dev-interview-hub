# DisabledStar

## Overview
The `DisabledStar` component renders a star icon that represents a disabled state in a star rating system. It is designed to be used in conjunction with a star rating component to visually indicate stars that are not interactable. The component adapts its rendering based on a feature flag, providing compatibility with different versions of design system.

## Type Definition
```typescript
interface StarProps extends TestProps {
    starNumber: number;
    size: number;
}
```

## Props 
The `DisabledStar` component extends `TestProps` and accepts the following props:

| Prop        | Type       | Required / Optional | Description                                        |
|-------------|------------|----------------------|----------------------------------------------------|
| `starNumber` | `number`  | Required             | The number representing the star's position (e.g., 1, 2, 3). |
| `size`       | `number`  | Required             | The size of the star icon in pixels.               |
| `data-testid` | `string` |  Optional            | Custom test ID for testing purposes.               |


## Features
1. **Conditional Rendering**: The component utilizes feature toggling to render different icon versions based on the `isAppRedesigned` feature flag. When the feature is enabled, it uses the redesigned `Icon` component; otherwise, it falls back to the deprecated `IconDeprecated`.This allows for seamless transitions between different versions of the design system.
2. **Dynamic Icon Size**: The size of the star icon is dynamically adjustable through the size prop, ensuring that the component can scale appropriately within various UI contexts.


## Usage Example 
```typescript jsx
import { DisabledStar } from '@/shared/ui/StarRating/DisabledStar';

const StarRating = () => (
    <div>
        <DisabledStar starNumber={1} size={24} />
        <DisabledStar starNumber={2} size={24} />
        <DisabledStar starNumber={3} size={24} />
        {/* Render additional stars as needed */}
    </div>
);
```

## Conclusion
The `DisabledStar` component is a flexible solution for displaying non-interactive star icons in a rating system. It leverages feature toggling for compatibility with different icon versions, supports dynamic sizing, and maintains consistent styling across various states. This ensures a clean, adaptable, and user-friendly UI experience
