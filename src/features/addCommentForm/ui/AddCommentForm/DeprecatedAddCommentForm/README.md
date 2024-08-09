# DeprecatedAddCommentForm

## Overview
The **`DeprecatedAddCommentForm`**  component provides a deprecated interface for adding comments to articles. 
This component is used when the feature flag `isAppRedesigned` is `false`, ensuring users can continue to add comments using the familiar, older UI elements. 
This approach helps maintain a consistent user experience during the transition to a new design system.

## Type Definition 
```typescript
export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}
```

## Props
The **`DeprecatedAddCommentForm`** component accepts the following props:

| Prop       | Type                               | Required / Optional | Description                                                              |
|------------|------------------------------------|----------------------|--------------------------------------------------------------------------|
| `className` | `string`                           | Optional             | Custom class name for additional styling..             |
| `onSendComment` | `(text: string) => void`                 | Required             | Callback function triggered when a comment is submitted. |


## Features
1. **Backward Compatibility**: Utilizes deprecated UI components to ensure compatibility with older versions of the application, facilitating a smooth transition to new UI elements.

2. **User-Friendly Commenting**: Allows users to easily add comments with a straightforward input field and send button, improving the overall user experience.

3. **Error Handling**: Includes basic error handling by returning `null` if an error occurs, preventing the form from rendering.

4. **State Management with `useAddCommentForm` Hook**: The component leverages the `useAddCommentForm` hook to manage the state and behavior of the form. This custom hook provides the necessary logic for handling text input changes and submitting comments, streamlining the process and ensuring that the component is clean and easy to maintain.

    - **State Management**: The hook manages the `text` state of the input field and handles any errors that may occur.
    - **Event Handlers**: Provides `onCommentTextChange` to update the comment text and `onSendHandler` to trigger the comment submission.

## Usage Example
```typescript jsx
import { DeprecatedAddCommentForm } from '@/features/addCommentForm/DeprecatedAddCommentForm';

const App = () => {
       const handleSendComment = () => {
        console.log('Comment sent')
    };

    return (
        <div>
            <DeprecatedAddCommentForm
                className="my-custom-class"
                onSendComment={handleSendComment}
            />
            {/* The DeprecatedAddCommentForm component allows users to add comments using deprecated UI elements */}
        </div>
    );
};

```
## Conclusion
The **`DeprecatedAddCommentForm`** component is essential for maintaining backward compatibility within applications that are transitioning to a new design system. By providing users with a familiar and intuitive interface for adding comments, it ensures a seamless and user-friendly experience while leveraging deprecated UI components. The inclusion of the `useAddCommentForm` hook for state management and event handling further enhances the component's functionality and maintainability.
