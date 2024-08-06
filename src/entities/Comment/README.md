# Comment Entity 

## Overview
The **`CommentList`** component is designed to display a list of user comments in a React application. 
It handles both loading states and the presentation of comments, adapting to different UI designs based on feature flags. 
The component provides a seamless user experience by integrating with the `CommentCard` for individual comment display and utilizing feature toggling to ensure compatibility with both redesigned and deprecated text elements.

## Type Definition
```typescript
interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}
```

## Props
The **`CommentList`** component accepts the following props:

| Prop        | Type        | Required / Optional | Description                                                                   |
|-------------|-------------|----------------------|-------------------------------------------------------------------------------|
| `comments`  | `Comment[]` | Optional            | An array of comment objects to be displayed in the list. |
| `isLoading` | `boolean`   | Optional             | If `true`, displays a loading state with placeholder comment cards.         |
| `className` | `string`    | Optional             | Custom class name for additional styling.                                     |

## Features

1. **Loading State**: Displays a series of `CommentCard` components in a loading state when `isLoading` is `true`. This provides users with a visual indication that content is being fetched.

2. **Conditional Rendering**:
    - **Comments Display**: Renders the list of comments using the `Each` component to iterate over the `comments` array. Each comment is displayed with a `CommentCard`.
    - **Empty State**: If there are no comments and the list is not in a loading state, the component uses `ToggleFeaturesComponent` to display a message indicating no comments. It switches between redesigned and deprecated text elements based on the `isAppRedesigned` feature flag.

3. **Feature Toggling**: Supports dynamic rendering of UI elements based on feature flags, ensuring the component adapts to both modern and legacy designs.

## Usage Example
```typescript jsx
import { CommentList } from '@/entities/Comment';
import { Comment } from '@/model/types/comment';

const sampleComments: Comment[] = [
    {
        id: '1',
        user: {
            id: '123',
            username: 'maryna_shavlak',
            avatar: 'path/to/avatar.jpg'
        },
        text: 'This is a sample comment'
    },
    {
        id: '2',
        user: {
            id: '456',
            username: 'john_doe',
            avatar: 'path/to/avatar.jpg'
        },
        text: 'Another sample comment'
    }
];

const ExampleComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState<Comment[]>(sampleComments);

    return (
        <div>
            <CommentList
                className="customCommentList"
                comments={comments}
                isLoading={isLoading}
            />
            {/* The CommentList component displays a list of comments or a loading state */}
        </div>
    );
};
```
## Conclusion
The **`CommentList`** component is essential for efficiently managing and displaying user comments within a React application. It handles various states including loading, comment display, and empty states, while also adapting to different UI designs through feature toggling. 
By leveraging `CommentCard` for comment presentation and dynamically switching text elements based on the feature flag, the component ensures a consistent and user-friendly experience across different application versions.
