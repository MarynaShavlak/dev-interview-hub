# CommentCard

## Overview
The **`CommentCard`** component is designed to display user comments in a React application, handling different UI states based on feature flags and loading conditions. 
It integrates with the `DeprecatedCommentCard` and `CommentCardRedesigned` components to offer backward compatibility and modern UI options, depending on the current feature settings. 
The component also includes a loading state using `CommentCardSkeleton`, ensuring a seamless user experience.

## Type Definition 
```typescript
interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

```

## Props
The **`CommentCard`** component accepts the following props:

| Prop       | Type      | Required / Optional | Description                                                                   |
|------------|-----------|----------------------|-------------------------------------------------------------------------------|
| `comment` | `Comment` | Optional            | The comment object to be displayed, containing user details and comment text. |
| `isLoading` | `boolean` | Optional             | If `true`, displays a loading skeleton instead of the comment content.          |
| `className` | `string`  | Optional             | Custom class name for additional styling.                                     |

## Features
1. **Conditional Rendering**:
   - **Loading State**: Displays a `CommentCardSkeleton` component when `isLoading` is `true`, providing a placeholder while data is being fetched.
   - **Feature Toggling**: Utilizes `ToggleFeaturesComponent` to conditionally render either the `CommentCardRedesigned` or `DeprecatedCommentCard`, based on the `isAppRedesigned` feature flag. This allows the component to adapt to different UI designs seamlessly.

2. **User Information Display**: Provides an interface to display the avatar and username of the comment's author, as well as the comment text, ensuring that all relevant information is accessible.

## Usage Example
```typescript jsx
import { CommentCard } from '@/entities/Comment';
import { Comment } from '@/entities/Comment';

const sampleComment: Comment = {
    id: '22436',
    user: {
        id: '123',
        username: 'maryna_shavlak',
        avatar: 'path/to/avatar.jpg'
    },
    text: 'This is a sample comment'
};

const ExampleComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [comment, setComment] = useState<Comment | undefined>(sampleComment);

    return (
        <div>
            <CommentCard
                className="customCommentCard"
                comment={comment}
                isLoading={isLoading}
            />
            {/* The CommentCard component handles loading and UI state, displaying either the redesigned or deprecated comment card */}
        </div>
    );
};
```
## Conclusion
The **`CommentCard`** component serves as a versatile and adaptive solution for rendering user comments within a React application. Its primary purpose is to manage and display comments efficiently while handling various states and feature configurations.
By integrating with `DeprecatedCommentCard` and `CommentCardRedesigned`, it ensures compatibility with both legacy and modern UI designs, delivering a consistent and user-friendly experience. 
This component is essential for applications transitioning between design systems, maintaining functionality and aesthetics across different versions.
