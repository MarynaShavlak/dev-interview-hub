# AddCommentFormRedesigned

## Overview
The **`AddCommentFormRedesigned`**  component is rendered when the feature flag `isAppRedesigned` is `true`, offering users an enhanced and modern interface for adding comments. 
When this feature flag is not active, the `AddCommentFormDeprecated` is rendered instead. This component leverages updated UI elements to ensure a seamless, intuitive, and visually appealing user experience.

## Type Definition
```typescript
export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}
```

## Props
The **`AddCommentFormRedesigned`** component accepts the following props:

| Prop       | Type                               | Required / Optional | Description                                                              |
|------------|------------------------------------|----------------------|--------------------------------------------------------------------------|
| `className` | `string`                           | Optional             | Custom class name for additional styling..             |
| `onSendComment` | `(text: string) => void`                 | Required             | Callback function triggered when a comment is submitted. |


## Features
1. **Modern UI Elements**: Utilizes the latest UI components to provide a contemporary look and feel for the comment form.
2. **User-Friendly Commenting:**: Provides a more intuitive and visually appealing interface for adding comments, leveraging updated design patterns.
3. **Error Handling**: Includes basic error handling by returning `null` if an error occurs, preventing the form from rendering.
4. **State Management with `useAddCommentForm` Hook**: The component leverages the `useAddCommentForm` hook to manage the state and behavior of the form. This custom hook provides the necessary logic for handling text input changes and submitting comments, streamlining the process and ensuring that the component is clean and easy to maintain.

    - **State Management**: The hook manages the `text` state of the input field and handles any errors that may occur.
    - **Event Handlers**: Provides `onCommentTextChange` to update the comment text and `onSendHandler` to trigger the comment submission.

## Usage Example
```typescript jsx
import { AddCommentFormRedesigned } from '@/features/addCommentForm/AddCommentFormRedesigned';

const App = () => {
    const handleSendComment = () => {
        console.log('Comment sent')
    };

    return (
        <div>
            <AddCommentFormRedesigned
                className="my-custom-class"
                onSendComment={handleSendComment}
            />
            {/* The AddCommentFormRedesigned component allows users to add comments using modern UI elements */}
        </div>
    );
};

```
## Conclusion

The **`AddCommentFormRedesigned`** component is essential for applications that embrace the latest design system, delivering a sleek, modern interface for users to add comments. This component not only enhances the overall user experience through updated UI elements but also ensures consistency with contemporary design standards. By leveraging the `useAddCommentForm` hook for efficient state management and event handling, the component remains both functional and easy to maintain, making it a valuable asset during the transition to a more refined user interface.
