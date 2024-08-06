# FeedbackDrawer

## Overview
The **`FeedbackDrawer`** component is designed to provide a user-friendly feedback form within a sliding drawer interface. It allows users to submit their feedback on a specific topic or feature of the application. The component supports feature toggling to switch between redesigned and deprecated styles for both the drawer and input elements.

## Type Definition 
```typescript
export interface FeedbackProps {
feedbackTitle?: string;
onClose: () => void;
onSubmitFeedback: () => void;
isOpen: boolean;
feedback?: string;
setFeedback: (feedBack: string) => void;
}
```

## Props

The **`FeedbackDrawer`** component accepts the following props:

| Prop               | Type                               | Required / Optional | Description                                           |
|--------------------|------------------------------------|----------------------|-------------------------------------------------------|
| `onClose`          | `() => void`                       | Required             | Callback function to handle closing the feedback form.|
| `onSubmitFeedback` | `() => void`                       | Required             | Callback function to handle submitting feedback.      |
| `isOpen`           | `boolean`                          | Required             | Boolean flag indicating whether the feedback form is open. |
| `setFeedback`      | `(feedback: string) => void`       | Required             | Function to update the feedback text.               |
| `feedbackTitle`    | `string`                           | Optional             | Title for the feedback form.                         |
| `feedback`         | `string`                           | Optional             | Current feedback text.                              |


## Features
1. **Feature Toggling**: Utilizes the `ToggleFeaturesComponent` to conditionally render either the redesigned or deprecated versions of the drawer, text, input, and button components based on the feature flag `isAppRedesigned`.

## Usage Example
```typescript jsx
import { FeedbackDrawer } from '@/entities/Rating/FeedbackDrawer';

const App = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleFeedbackChange = (newFeedback: string) => {
        setFeedback(newFeedback);
    };

    const handleFeedbackSubmit = () => {
        // Submit feedback logic here
        setDrawerOpen(false);
    };

    return (
        <>
            <button onClick={() => setDrawerOpen(true)}>Open Feedback Drawer</button>
            <FeedbackDrawer
                isOpen={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
                feedbackTitle="Submit Your Feedback"
                feedback={feedback}
                setFeedback={handleFeedbackChange}
                onSubmitFeedback={handleFeedbackSubmit}
            />
        </>
    );
};
```
## Conclusion
The **`FeedbackDrawer`**  component provides a robust solution for collecting user feedback in a React application. By supporting both redesigned and deprecated styles, as well as integrating translation and feature toggling, it ensures a flexible and accessible user experience while maintaining high standards of code maintainability and scalability.
