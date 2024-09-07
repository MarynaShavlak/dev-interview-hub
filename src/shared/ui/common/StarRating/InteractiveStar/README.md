# InteractiveStar
## Overview
The `InteractiveStar` component is a versatile star icon used in interactive star rating systems. It supports dynamic styles based on user interactions, such as hovering and clicking, and integrates feature toggling to accommodate different versions of icon components.

## Type Definition
```typescript
interface InteractiveStarProps extends TestProps {
    starNumber: number;
    size: number;
    activeStarsCount: number;
    isSelected: boolean;
    onHover: (starNumber: number) => () => void;
    onLeave: () => void;
    onClick: (starNumber: number) => () => void;
}
```
## Props 
The `InteractiveStar` component extends `TestProps` and accepts the following props:

| Prop              | Type                                | Required / Optional | Description                                        |
|-------------------|-------------------------------------|----------------------|----------------------------------------------------|
| `starNumber`       | `number`                            | Required             | The number representing the star's position (e.g., 1, 2, 3). |
| `size`             | `number`                            | Required             | The size of the star icon in pixels.               |
| `activeStarsCount`| `number`                            | Required             | The total number of stars currently selected or hovered. |
| `isSelected`       | `boolean`                           | Required             | Indicates whether the star is selected.           |
| `onHover`          | `(starNumber: number) => () => void` | Required             | Callback function to handle hover events, returning a function that handles hover action. |
| `onLeave`          | `() => void`                         | Required             | Callback function to handle mouse leave events.    |
| `onClick`          | `(starNumber: number) => () => void` | Required             | Callback function to handle click events, returning a function that handles click action. |
| `data-testid`      | `string`                            | Optional             | Custom test ID for testing purposes.            |


## Features
1. **Conditional Rendering**: The component utilizes feature toggling to render different icon versions based on the `isAppRedesigned` feature flag. When the feature is enabled, it uses the redesigned `Icon` component; otherwise, it falls back to the deprecated `IconDeprecated`.This allows for seamless transitions between different versions of the design system.
2. **Dynamic Icon Size**: The size of the star icon is dynamically adjustable through the size prop, ensuring that the component can scale appropriately within various UI contexts.
3. **Event Handling**: Provides callback functions for hover, leave, and click events, enabling interactive behavior and user feedback.


## Usage Example 
```typescript jsx
import { InteractiveStar } from '@/components/InteractiveStar';

const StarRating = () => {
    const handleHover = (starNumber: number) => () => {
        // Handle hover action
    };

    const handleLeave = () => {
        // Handle mouse leave action
    };

    const handleClick = (starNumber: number) => () => {
        // Handle click action
    };

    return (
        <div>
            <InteractiveStar
                starNumber={1}
                size={24}
                activeStarsCount={3}
                isSelected={true}
                onHover={handleHover}
                onLeave={handleLeave}
                onClick={handleClick}
            />
            <InteractiveStar
                starNumber={2}
                size={24}
                activeStarsCount={3}
                isSelected={false}
                onHover={handleHover}
                onLeave={handleLeave}
                onClick={handleClick}
            />
            {/* Render additional stars as needed */}
        </div>
    );
};
```
## Conclusion
The `InteractiveStar` component is a dynamic and interactive solution for star rating systems. It features conditional rendering, interactive styles, and event handling, making it a flexible and user-friendly choice for rating interfaces. Its compatibility with different design versions ensures seamless integration into various application contexts.
