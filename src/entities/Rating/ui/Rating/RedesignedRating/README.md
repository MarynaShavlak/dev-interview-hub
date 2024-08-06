# DeprecatedRating

## Overview
The **`RedesignedRating`** component is rendered when the feature flag `isAppRedesigned` is `true`, providing users with an updated and modern interface for giving star ratings and feedback. 
If this feature flag is not active, the `DeprecatedRating` component is rendered instead. 
This component leverages contemporary UI elements to enhance the user experience and ensure a seamless interaction with the rating system.

## Type Definition 
```typescript
interface RedesignedRatingProps {
    feedbackContainer: ReactElement;
    starsCount: number;
    className?: string;
    onSelect: (starsCount: number) => void;
    title?: string;
}
```

## Props

The **`RedesignedRating`** component accepts the following props:

| Prop               | Type                                       | Required / Optional | Description                                                  |
|--------------------|--------------------------------------------|---------------------|--------------------------------------------------------------|
| `feedbackContainer`| `ReactElement`                             | Required            | Container element for the feedback section.                  |
| `starsCount`       | `number`                                   | Required            | The number of stars currently selected.                      |
| `className`        | `string`                                   | Optional            | Custom class name for additional styling.                    |
| `onSelect`         | `(starsCount: number) => void`             | Required            | Callback function to handle star selection.                  |
| `title`            | `string`                                   | Optional            | Title to display when no stars are selected.                 |


## Features
1.**Modern UI Elements**: Utilizes the latest UI components to provide a refreshed and contemporary look and feel.

2.**User Feedback**: Allows users to provide star ratings and feedback, enhancing the user experience and gathering valuable input.

## Usage Example
```typescript jsx
import { RedesignedRating } from '@/entities/Rating/RedesignedRating';

const App = () => {
    const handleSelect = (starsCount: number) => {
        console.log('Selected stars:', starsCount);
    };

    return (
        <div>
            <RedesignedRating
                className="my-custom-class"
                starsCount={0}
                feedbackContainer={<div>Feedback Form</div>}
                onSelect={handleSelect}
                title="Please rate this article"
            />
            {/* The RedesignedRating component allows users to rate items and provide feedback */}
        </div>
    );
};
```

## Conclusion
The **`RedesignedRating`** component is a key part of applications that embrace the latest design standards. By offering an intuitive and modern interface for star ratings and feedback, it enhances user interaction while aligning with contemporary design practices.
