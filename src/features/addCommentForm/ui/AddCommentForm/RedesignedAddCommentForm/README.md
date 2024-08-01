# RedesignedAddCommentForm

## Overview
The **`RedesignedAddCommentForm`**  component is rendered when the feature flag `isAppRedesigned` is `true`, offering users an enhanced and modern interface for adding comments. 
When this feature flag is not active, the `DeprecatedAddCommentForm` is rendered instead. This component leverages updated UI elements to ensure a seamless, intuitive, and visually appealing user experience.

## Type Definition
```typescript
interface RedesignedAddCommentFormProps {
    className?: string;
    text: string;
    onCommentTextChange: (text: string) => void;
    onSendHandler: () => void;
}
```

## Props
The **`RedesignedAddCommentForm`** component accepts the following props:

| Prop       | Type                               | Required / Optional | Description                                                               |
|------------|------------------------------------|----------------------|---------------------------------------------------------------------------|
| `text` | `string`                           | Required             | The current text of the comment input field.              |
| `onCommentTextChange` | `(text: string) => void`                 | Required             | Callback function to handle changes in the comment input text. |
| `onSendHandler` | `() => void` | Required              | Callback function to handle the comment submission action.                                 |
| `className` | `string`                           | Optional             | Custom class name for additional styling.                                 |


## Features
1.**Modern UI Elements**: Utilizes the latest UI components to provide a contemporary look and feel for the comment form.
2.**User-Friendly Commenting:**: Provides a more intuitive and visually appealing interface for adding comments, leveraging updated design patterns.

## Usage Example
```typescript jsx
import { RedesignedAddCommentForm } from '@/features/addCommentForm/RedesignedAddCommentForm';

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
            <RedesignedAddCommentForm
                className="my-custom-class"
                text={commentText}
                onCommentTextChange={handleCommentTextChange}
                onSendHandler={handleSendComment}
            />
            {/* The RedesignedAddCommentForm component allows users to add comments using modern UI elements */}
        </div>
    );
};

```
## Conclusion
The **`RedesignedAddCommentForm`** component is a key part of applications that adopt the latest design system. By providing a sleek and modern interface for adding comments, it enhances the user experience while aligning with contemporary design standards.
