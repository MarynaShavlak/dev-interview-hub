# StarRating
## Overview
The `StarRating` component provides a comprehensive star rating system that allows users to rate items with a visual representation of stars. It integrates both interactive and disabled star components, supports feature toggling for different styling, and handles user interactions like selecting and hovering over stars.

## Type Definition
```typescript
interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
    disabled?: boolean;
}
```
## Props

The **`StarRating`** component accepts the following props:

| Prop            | Type                                | Required / Optional             | Description                                                |
|-----------------|-------------------------------------|---------------------------------|------------------------------------------------------------|
| `className`     | `string`                            | Optional                        | Custom class name for additional styling.                  |
| `onSelect`      | `(starsCount: number) => void`       | Optional                        | Callback function to handle star selection actions.        |
| `size`          | `number`                            | Optional <br/> (default : `30`) | The size of the star icons in pixels.                    |
| `selectedStars` | `number`                            | Optional <br/> (default : `0`)  | The number of stars currently selected.                   |
| `disabled`      | `boolean`                           | Optional                        | If `true`, the stars will be rendered in a disabled state. |

## Features

1. **Conditional Rendering**: Uses feature toggling to apply different styles based on the `isAppRedesigned` feature flag. This allows the component to adapt its styling according to the application's design system.

2. **Dynamic Rendering**: Conditionally renders interactive stars or disabled stars based on the `disabled` prop. Interactive stars support user interactions, while disabled stars are purely decorative.

3. **Event Handling**: Integrates with the `useStarRating` hook to manage interactions such as hovering and clicking on stars. This ensures smooth user interaction and visual feedback.

4. **CSS Modules**: Utilizes CSS modules (`cls.StarRating` and `cls.StarRatingRedesigned`) for scoped styling, ensuring that the component's styles do not conflict with other components.

5. **Mapping and Rendering**: Employs the `Each` component to efficiently render a list of stars based on the defined `stars` array.

## Usage Example
```typescript jsx
import { StarRating } from '@/components/StarRating';

const App = () => {
    const handleSelect = (starsCount: number) => {
        // Handle star selection
        console.log(`Selected ${starsCount} stars`);
    };

    return (
        <StarRating
            className="my-star-rating"
            size={40}
            selectedStars={3}
            onSelect={handleSelect}
            disabled={false}
        />
    );
};
```

## Conclusion
The` StarRating` component offers a robust and flexible star rating interface for React applications. With features like conditional rendering, dynamic styles, and event handling, it provides a rich user experience while maintaining compatibility with different design systems. Its ability to handle both interactive and disabled states ensures that it meets various application requirements.
