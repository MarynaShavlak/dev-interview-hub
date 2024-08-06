# DeprecatedCommentCard

## Overview
The **`DeprecatedCommentCard`** component is used to render individual comments in a deprecated interface. It offers users a way to view comment details using legacy UI elements. This component is particularly useful during the transition period when the application is shifting to newer UI components. 
When the feature flag `isAppRedesigned` is activated, the `RedesignedCommentCard` will be used instead, offering an updated interface.

## Type Definition 
```typescript
interface DeprecatedCommentCardProps {
    className?: string;
    comment: Comment;
}
```

## Props
The **`DeprecatedCommentCard`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `comment` | `Comment`   | Required             | The comment object to be displayed, containing user details and comment text.             |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |


## Features
1.**Backward Compatibility**: Maintains compatibility with older comment display mechanisms, allowing users to interact with the comment section using familiar UI components.

2.**User Information Display**: Provides an interface to display the avatar and username of the comment's author, as well as the comment text, ensuring that all relevant information is accessible.

## Usage Example
```typescript jsx
import { DeprecatedCommentCard } from '@/entities/Comment';
import { Comment } from '@/model/types/comment';

const sampleComment: Comment = {
    id: '22436',
    user: {
        id: '123',
        username: 'maryna_shavlak',
        avatar: 'path/to/avatar.jpg'
    },
    text: 'This is a sample comment'
};

const App = () => {
    return (
        <div>
            <DeprecatedCommentCard
                className="my-custom-class"
                comment={sampleComment}
            />
            {/* The DeprecatedCommentCard component displays user comments with legacy styling */}
        </div>
    );
};

```
## Conclusion
The **`DeprecatedCommentCard`** component is crucial for maintaining consistency in user experience while transitioning to a new design system. By leveraging deprecated UI components, it ensures that comments are displayed in a familiar format, providing users with a smooth and uninterrupted interaction with the comment section.
