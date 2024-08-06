# FeedbackDrawer

## Overview
The **`FeedbackModal`** component is designed to present a feedback form within a modal dialog. It allows users to submit feedback on various aspects of the application. The component features conditional rendering based on feature flags to display either redesigned or deprecated versions of the modal, text, input, and buttons. This modal includes translation support for button labels and placeholder text to ensure accessibility for international users.

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
The **`FeedbackModal`** component accepts the following props:

| Prop               | Type                               | Required / Optional | Description                                           |
|--------------------|------------------------------------|----------------------|-------------------------------------------------------|
| `onClose`          | `() => void`                       | Required             | Callback function to handle closing the feedback form.|
| `onSubmitFeedback` | `() => void`                       | Required             | Callback function to handle submitting feedback.      |
| `isOpen`           | `boolean`                          | Required             | Boolean flag indicating whether the feedback form is open. |
| `setFeedback`      | `(feedback: string) => void`       | Required             | Function to update the feedback text.               |
| `feedbackTitle`    | `string`                           | Optional             | Title for the feedback form.                         |
| `feedback`         | `string`                           | Optional             | Current feedback text.                              |


## Features
1. **Feature Toggling**: Utilizes the `ToggleFeaturesComponent` to conditionally render either the redesigned or deprecated versions of the modal, text, input, and button components based on the feature flag `isAppRedesigned`.

## Usage Example
```typescript jsx
import { FeedbackModal } from '@/entities/Rating/FeedbackModal';

const App = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleFeedbackChange = (newFeedback: string) => {
        setFeedback(newFeedback);
    };

    const handleFeedbackSubmit = () => {
        // Submit feedback logic here
        setModalOpen(false);
    };

    return (
        <>
            <button onClick={() => setModalOpen(true)}>Open Feedback Modal</button>
            <FeedbackModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
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
The **`FeedbackModal`**  component offers a flexible and user-friendly approach for collecting feedback within a modal interface. By leveraging feature toggling and internationalization, it provides an adaptable and scalable solution that enhances user experience while ensuring maintainability and alignment with the application's design standards.
