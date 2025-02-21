# Rating

## Overview
The **`Rating`** component provides a flexible rating system for users to submit their star ratings along with optional feedback. It supports both redesigned and deprecated styles, determined by a feature flag. The component manages the state of the star rating and feedback input and integrates a feedback modal when required.

## Type Definition
```typescript
interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onSubmitRating?: (starsCount: number) => void;
    onSubmitFeedback?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}
```

## Props

The **`Rating`** component accepts the following props:

| Prop                | Type                                | Required / Optional | Description                                                |
|---------------------|-------------------------------------|----------------------|------------------------------------------------------------|
| `className`         | `string`                            | Optional             | CSS class names for custom styling.                       |
| `title`             | `string`                            | Optional             | Title to display with the rating component.               |
| `feedbackTitle`     | `string`                            | Optional             | Title for the feedback modal, if applicable.              |
| `hasFeedback`       | `boolean`                           | Optional             | Flag to determine if feedback input is enabled.           |
| `onSubmitRating`    | `(starsCount: number) => void`      | Optional             | Callback for handling rating submission without feedback. |
| `onSubmitFeedback`  | `(starsCount: number, feedback?: string) => void` | Optional | Callback for handling rating and feedback submission.     |
| `rate`              | `number`                            | Optional             | Initial star rating value. Defaults to `0`.               |


## Features
1.**Feature Toggling**: Uses the `ToggleFeaturesComponent` to conditionally render either the `RatingRedesigned` or `DeprecatedRating` components based on the `isAppRedesigned` feature flag.

2.**State Management**: Manages the state for the current star rating, feedback text, and modal visibility.

3.**Feedback Handling**: Opens a feedback modal if `hasFeedback` is `true`, allowing users to submit additional comments.

## Usage Example
```typescript jsx
import { Rating } from '@/entities/Rating';

const App = () => {
    const handleRatingSubmit = (starsCount: number) => {
        console.log(`Rating submitted: ${starsCount} stars`);
    };

    const handleFeedbackSubmit = (starsCount: number, feedback?: string) => {
        console.log(`Rating: ${starsCount} stars, Feedback: ${feedback}`);
    };

    return (
        <Rating
            title="Rate our service"
            feedbackTitle="We appreciate your feedback!"
            hasFeedback={true}
            onSubmitRating={handleRatingSubmit}
            onSubmitFeedback={handleFeedbackSubmit}
        />
    );
};

```
## Conclusion
The **`Rating`** component offers a versatile and user-friendly rating system, adaptable to both redesigned and deprecated styles through feature toggling. It effectively manages star rating and feedback submission, providing a seamless user experience while maintaining flexibility for different application needs. The component's integration with feedback handling and state management ensures robust functionality and ease of use.


