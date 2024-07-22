# Avatar (Deprecated)
Note: This component is deprecated. Please use the new component from the redesigned directory.

## Overview
The `Avatar` component serves as a versatile and customizable element for displaying user profile images within a React application. 
It is designed to support various sizes and fallback options to ensure consistent and graceful display even when the primary image source fails.

## Type Definitions
The types used in the `Avatar` component are defined as follows:
```typescript
interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
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
| `fallbackInverted`  | `boolean`  |            Optional             | Inverts the fallback icon colors.      |

## Features:
- **Image Fallbacks**: The `Avatar` component provides both a loading state using a `Skeleton` component and an error state using a default `UserIcon`. This ensures that a visual placeholder is always displayed.

## Usage Examples

### Example 1: Basic Avatar Component
```jsx
import { Avatar } from '@/shared/ui/redesigned/Avatar';

export const BasicAvatarExample = () => {
    return (
        <Avatar src="https://example.com/user.jpg" alt="User" size={50} />
    );
};
```

### Example 2: Avatar with inverted icon
```jsx
import { Avatar } from '@/shared/ui/redesigned/Avatar';

export const AvatarWithInvertedIconxample = () => {
    return (
        <Avatar
            src="https://example.com/user.jpg"
            alt="User"
            inverted
        />
    );
};
```

## Conclusion
The `Avatar` component is a flexible and reliable solution for displaying user profile images in React applications. 
Its ability to handle various image states, customizable size and inverted colors makes it a robust choice for user interface design. 
By providing fallbacks and accessibility features, the `Avatar` component ensures a consistent and user-friendly experience.
