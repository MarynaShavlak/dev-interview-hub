# Avatar
## Overview
The `Avatar` component serves as a versatile and customizable element for displaying user profile images within a React application. It is designed to support various sizes and fallback options, ensuring that user images are displayed consistently and gracefully even when the primary image source fails. Additionally, the `Avatar` component can display a username alongside the image, making it an essential component for user interface elements such as profiles, comments, and chat applications.

## Type Definitions
The types used in the `Avatar` component are defined as follows:
```typescript
interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    userName?: string;
}
```


## Props
The `Avatar` component accepts the following props:

| Prop        | Type      |       Required / Optional       | Description                                             |
|-------------|-----------|:-------------------------------:|---------------------------------------------------------|
| `className` | `string ` |            Optional             | Additional custom class names to style the avatar.      |
| `src`       | `string`  |            Optional             | URL of the image to be displayed.      |
| `alt`       | `string`  |            Optional             | Alternative text for the image.       |
| `size`      | `number`  | Optional <br/> (default: `100`) | Specifies the width and height of the avatar in pixels.      |
| `userName`  | `string`  |            Optional             | Name of the user to be displayed alongside the avatar.      |

## Features:
- **Image Fallbacks**: The `Avatar` component provides both a loading state using a `Skeleton` component and an error state using a default `UserIcon`. This ensures that a visual placeholder is always displayed.
- **UserName Display**: When the `userName` prop is provided, the component displays the username next to the avatar, creating a combined visual element suitable for user profiles and comments.



## Usage Examples

### Example 1: Basic Avatar Component
```typescript jsx
import { Avatar } from '@/shared/ui/redesigned/Avatar';

export const BasicAvatarExample = () => {
    return (
        <Avatar src="https://example.com/user.jpg" alt="User" size={50} />
    );
};
```

### Example 2: Avatar with UserName
```typescript jsx
import { Avatar } from '@/shared/ui/redesigned/Avatar';

export const AvatarWithUserNameExample = () => {
    return (
        <Avatar
            src="https://example.com/user.jpg"
            alt="User"
            userName="Maryna Shavlak"
        />
    );
};
```

## Conclusion
The `Avatar` component is a flexible and reliable solution for displaying user profile images in React applications. Its ability to handle various image states, customizable size, and optional username display makes it a robust choice for user interface design. By providing fallbacks and accessibility features, the `Avatar` component ensures a consistent and user-friendly experience.
