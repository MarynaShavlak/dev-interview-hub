## useStarRating Hook
A custom React hook designed to manage the state and behavior of a star rating component. It simplifies handling user interactions such as hovering, clicking, and maintaining the selected rating.

## Parameters

- `selectedStars`: An optional number indicating the initially selected number of stars. Defaults to 0.
- `onSelect`: An optional callback function that is invoked when a star rating is selected. Receives the number of stars selected as a parameter.

## Returns
An object with the following properties:
- `activeStarsCount`: A number indicating the current quantity of stars highlighted during hover or selection.
- `isSelected`: A boolean indicating whether a rating has been already selected. Useful for displaying the final selected rating.
- `onHover`: A function to handle the hover event over a specific number of stars. Updates `activeStarsCount` based on the hovered star count.
- `onLeave`: A function to handle when the mouse leaves the star rating area. Resets `activeStarsCount` to 0 if no stars are selected.
- `onClick`: A function to handle the click event on a specific number of stars. Sets the `activeStarsCount`, updates `isSelected`, and triggers the `onSelect` callback.

## Internal Behavior
1. **State Management**:
    - **`activeStarsCount`**: Holds the number of stars currently highlighted during hover. Initially set to the `selectedStars` prop.
    - **`isSelected`**: Indicates if a rating has already been selected. Initially set to `true` if `selectedStars` is greater than 0.

2. **Callbacks**:
    - **`onHover`**: Handles the hover event over stars. Updates `activeStarsCount` to the number of hovered stars if no rating is selected.
    - **`onLeave`**: Handles the mouse leaving the rating area. Resets `activeStarsCount` to 0 if no rating is selected.
    - **`onClick`**: Handles the click event on stars. Updates `activeStarsCount`, sets `isSelected` to `true`, and calls the `onSelect` callback with the selected number of stars.

3. **Effects**:
    - **`useCallback`**: Ensures that the `onHover`, `onLeave`, and `onClick` functions are memoized to avoid unnecessary re-renders.

## Usage Example
```typescript jsx
import React, { useState } from 'react';
import { useStarRating } from '@/shared/lib/hooks/useStarRating/useStarRating';

const StarRating = () => {
    const [rating, setRating] = useState(0);
    const { activeStarsCount, isSelected, onHover, onLeave, onClick } = useStarRating({
        selectedStars: rating,
        onSelect: setRating,
    });

    return (
        <div>
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    key={star}
                    onMouseEnter={onHover(star)}
                    onMouseLeave={onLeave}
                    onClick={onClick(star)}
                    style={{ cursor: 'pointer', color: star <= activeStarsCount ? 'red' : 'green' }}
                >
                    ★
                </span>
            ))}
            {isSelected && <div>Selected Rating: {rating} stars</div>}
        </div>
    );
};

export default StarRating;
```

## Conclusion
The `useStarRating` hook manages the state and behavior of a star rating component, including handling hover, click interactions, and maintaining the selected rating. It provides a streamlined way to manage user interactions and state updates for star rating UI elements.
