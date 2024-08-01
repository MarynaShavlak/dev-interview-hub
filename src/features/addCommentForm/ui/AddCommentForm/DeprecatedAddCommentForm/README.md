# DeprecatedAddCommentForm

## Overview
The **`DeprecatedAddCommentForm`**  component provides a deprecated interface for adding comments to articles. 
This component is used when the feature flag `isAppRedesigned` is `false`, ensuring users can continue to add comments using the familiar, older UI elements. 
This approach helps maintain a consistent user experience during the transition to a new design system.

## Type Definition 
```typescript
interface DeprecatedAddCommentFormProps {
    className?: string;
    text: string;
    onCommentTextChange: (text: string) => void;
    onSendHandler: () => void;
}
```

## Props
The **`DeprecatedAddCommentForm`** component accepts the following props:

| Prop       | Type                               | Required / Optional | Description                                                               |
|------------|------------------------------------|----------------------|---------------------------------------------------------------------------|
| `text` | `string`                           | Required             | The current text of the comment input field.              |
| `onCommentTextChange` | `(text: string) => void`                 | Required             | Callback function to handle changes in the comment input text. |
| `onSendHandler` | `() => void` | Required              | Callback function to handle the comment submission action.                                 |
| `className` | `string`                           | Optional             | Custom class name for additional styling.                                 |


## Features
1.**Backward Compatibility**: Utilizes deprecated UI components to ensure compatibility with older versions of the application, facilitating a smooth transition to new UI elements.

2.**User-Friendly Commenting:**: Allows users to easily add comments with a straightforward input field and send button, improving the overall user experience.

## Usage Example
```typescript jsx
import { DeprecatedAddCommentForm } from '@/features/addCommentForm/DeprecatedAddCommentForm';

const App = () => {
    const [commentText, setCommentText] = useState('');

    const handleCommentTextChange = (text: string) => {
        setCommentText(text);
    };

    const handleSendComment = () => {
        console.log('Comment sent:', commentText);
    };

    return (
        <div>
            <DeprecatedAddCommentForm
                className="my-custom-class"
                text={commentText}
                onCommentTextChange={handleCommentTextChange}
                onSendHandler={handleSendComment}
            />
            {/* The DeprecatedAddCommentForm component allows users to add comments using deprecated UI elements */}
        </div>
    );
};

```
## Conclusion
The **`DeprecatedAddCommentForm`** component is essential for maintaining backward compatibility within applications that are transitioning to a new design system. 
By providing users with a familiar and intuitive interface for adding comments, it ensures a seamless and user-friendly experience while leveraging deprecated UI components.
