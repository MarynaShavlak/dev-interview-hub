# DeprecatedRating

## Overview
The **`DeprecatedRating`** component renders a deprecated interface for providing star ratings and feedback. 
This component is part of the deprecated UI and is used when the feature flag `isAppRedesigned` is `false`. 
It allows users to rate items and provide feedback while maintaining backward compatibility with the older version of the application interface.

## Type Definition 
```typescript
interface DeprecatedRatingProps {
    feedbackContainer: ReactElement;
    starsCount: number;
    className?: string;
    onSelect: (starsCount: number) => void;
    title?: string;
}
```

## Props

The **`DeprecatedRating`** component accepts the following props:

| Prop               | Type                                       | Required / Optional | Description                                                  |
|--------------------|--------------------------------------------|---------------------|--------------------------------------------------------------|
| `feedbackContainer`| `ReactElement`                             | Required            | Container element for the feedback section.                  |
| `starsCount`       | `number`                                   | Required            | The number of stars currently selected.                      |
| `className`        | `string`                                   | Optional            | Custom class name for additional styling.                    |
| `onSelect`         | `(starsCount: number) => void`             | Required            | Callback function to handle star selection.                  |
| `title`            | `string`                                   | Optional            | Title to display when no stars are selected.                 |


## Features
1.**Backward Compatibility**: Utilizes deprecated UI components to ensure compatibility with older versions of the application, facilitating a smooth transition to new UI elements.

2.**User Feedback**: Allows users to provide star ratings and feedback, enhancing the user experience and gathering valuable input.

## Usage Example
```typescript jsx
import { DeprecatedRating } from '@/entities/Rating/DeprecatedRating';

const App = () => {
    const handleSelect = (starsCount: number) => {
        console.log('Selected stars:', starsCount);
    };

    return (
        <div>
            <DeprecatedRating
                className="my-custom-class"
                starsCount={0}
                feedbackContainer={<div>Feedback Form</div>}
                onSelect={handleSelect}
                title="Please rate this article"
            />
            {/* The DeprecatedRating component allows users to rate items and provide feedback */}
        </div>
    );
};

```
## Conclusion
The **`DeprecatedRating`** component is crucial for maintaining backward compatibility within applications transitioning to a new design system. By offering a familiar and intuitive interface for star ratings and feedback, it ensures a seamless and user-friendly experience while leveraging deprecated UI components.
