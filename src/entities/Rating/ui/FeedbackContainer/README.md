# FeedbackContainer

## Overview
The **`FeedbackContainer`** component offers a responsive solution for capturing user feedback across different devices. It integrates both a modal and a drawer component, depending on whether the user is on a desktop or mobile device. This component ensures a seamless feedback experience, allowing users to provide feedback in an optimal manner based on their device.

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

The **`FeedbackContainer`** component accepts the following props:

| Prop               | Type                               | Required / Optional | Description                                           |
|--------------------|------------------------------------|----------------------|-------------------------------------------------------|
| `onClose`          | `() => void`                       | Required             | Callback function to handle closing the feedback form.|
| `onSubmitFeedback` | `() => void`                       | Required             | Callback function to handle submitting feedback.      |
| `isOpen`           | `boolean`                          | Required             | Boolean flag indicating whether the feedback form is open. |
| `setFeedback`      | `(feedback: string) => void`       | Required             | Function to update the feedback text.               |
| `feedbackTitle`    | `string`                           | Optional             | Title for the feedback form.                         |
| `feedback`         | `string`                           | Optional             | Current feedback text.                              |


## Features
1.**Responsive Design**: The component adapts its presentation based on device type. For desktop users, it displays a `FeedbackModal`, while for mobile users, it uses a `FeedbackDrawer`. This ensures an optimized feedback submission experience on all devices.

2.**Device Detection**: Leverages **'react-device-detect'** to determine the device type and conditionally render either the modal or drawer based on the user's device.

3.**Feedback Submission**: Provides functionality for users to submit their feedback through `onSubmitFeedback`, enabling easy integration with feedback handling processes.

4.**FeedbackDrawer Integration**: For mobile users, the drawer offers a compact and accessible feedback form.

5.**FeedbackModal Integration**: For desktop users, the modal provides a comprehensive view for feedback submission.

6.**State Management**: Handles feedback input and visibility state using the provided `feedback` and `setFeedback` props, ensuring that feedback can be dynamically updated and managed.

## Usage Example
```typescript jsx
import { FeedbackContainer } from '@/entities/Rating/FeedbackContainer';

const App = () => {
    const [isFeedbackOpen, setFeedbackOpen] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleOpenFeedback = () => setFeedbackOpen(true);
    const handleCloseFeedback = () => setFeedbackOpen(false);
    const handleSubmitFeedback = () => {
        // Handle feedback submission logic here
        console.log('Feedback submitted:', feedback);
        setFeedbackOpen(false);
    };

    return (
        <div>
            <button onClick={handleOpenFeedback}>Give Feedback</button>
            <FeedbackContainer
                isOpen={isFeedbackOpen}
                onClose={handleCloseFeedback}
                onSubmitFeedback={handleSubmitFeedback}
                feedback={feedback}
                setFeedback={setFeedback}
                feedbackTitle="We Value Your Feedback"
            />
        </div>
    );
};
```
## Conclusion
The **`FeedbackContainer`** component is designed to provide a flexible and user-friendly feedback submission interface across different devices. By integrating both a modal and drawer component, it ensures that users can easily submit feedback regardless of their device. With its responsive design and effective state management, it enhances user interaction and feedback collection.
