# RedesignedCommentCard

## Overview
The **`RedesignedCommentCard`** component is introduced as part of the updated user interface, providing a modern and visually appealing way to display individual comments. 
This component is rendered when the feature flag `isAppRedesigned` is set to true, showcasing the latest design elements and improved user experience. 
If the feature flag is not active, the `DeprecatedCommentCard` will be used instead, maintaining consistency for users not yet transitioned to the new interface.

## Type Definition 
```typescript
interface RedesignedCommentCardProps {
    className?: string;
    comment: Comment;
}
```

## Props
The **`RedesignedCommentCard`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                                               |
|------------|------------|----------------------|---------------------------------------------------------------------------|
| `comment` | `Comment`   | Required             | The comment object to be displayed, containing user details and comment text.             |
| `className` | `string`   | Optional             | Custom class name for additional styling.                                 |


## Features
1.**Modern UI Elements**: Utilizes the latest UI components to provide a refreshed and contemporary look and feel.

2.**User Information Display**: Provides an interface to display the avatar and username of the comment's author, as well as the comment text, ensuring that all relevant information is accessible.

## Usage Example
```typescript jsx
import { RedesignedCommentCard } from '@/entities/Comment';
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
            <RedesignedCommentCard
                className="my-custom-class"
                comment={sampleComment}
            />
            {/* The RedesignedCommentCard component provides an updated look for displaying comments */}
        </div>
    );
};

```
## Conclusion
The **`RedesignedCommentCard`** component represents a significant advancement in comment display, offering a modern and engaging interface. By leveraging updated design elements and improving user interaction, it enhances the overall experience while reflecting the latest design standards. This component is crucial for applications transitioning to a new design system, ensuring that users benefit from a contemporary and visually appealing comment presentation.
