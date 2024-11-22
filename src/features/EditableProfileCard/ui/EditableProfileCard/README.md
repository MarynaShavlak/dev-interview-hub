# EditableProfileCard

## Overview
The **`EditableProfileCard`** component provides a dynamic and user-friendly interface for displaying and editing user profile information. It leverages feature flags to adapt its appearance and functionality based on the application's design configuration. Utilizing the `isAppRedesigned` flag, it conditionally applies styling for either the redesigned or deprecated profile card interface. The component incorporates dynamic reducer management via `DynamicModuleLoader`, ensuring that the `profileReducer` is only loaded when necessary. This approach enhances performance by minimizing the initial bundle size and optimizing state management. Additionally, the component handles profile data fetching and validation, providing users with a seamless editing experience.

## Type Definition
```typescript
interface EditableProfileCardProps {
    className?: string;
    id?: string;
}
```

## Props

The **`EditableProfileCard`** component accepts the following props:

| Prop       | Type                     | Required / Optional | Description                                               |
|------------|--------------------------|----------------------|-----------------------------------------------------------|
| `className` | `string`                 | Optional             | Custom class name for additional styling.                |
| `id`        | `string`                 | Optional             | Identifier for the profile data to fetch and edit.        |

## Features

1. **Feature Flag Driven**: The component adapts its UI between redesigned and deprecated profile card styles based on the `isAppRedesigned` feature flag. This ensures that the profile editing interface remains consistent with the current design standards.

2. **Dynamic Reducer Management**: Utilizes `DynamicModuleLoader` to manage the `profileReducer` dynamically. This ensures that the reducer is only loaded when the profile card is needed, thereby optimizing state management and reducing the overall bundle size.

3. **Profile Data Fetching and Validation**: Fetches profile data on initialization using `fetchProfileData` and displays validation errors with `EditableProfileCardError` if they occur. This ensures that users receive immediate feedback and can correct any issues during the profile editing process.


## Usage Example 
```typescript jsx
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { VStack } from '@/shared/ui/redesigned/Stack';

export const ProfileContainer = memo(() => {
    const { id } = useParams<{ id: string }>();

    return (
        <VStack gap="16" max>
            <EditableProfileCard id={id} />
        </VStack>
    );
});
```

## Conclusion

The **`EditableProfileCard`** component is central to providing a flexible and dynamic user profile editing interface. By leveraging feature flags and dynamic reducer management, it ensures that the component remains in line with the application's design and performance standards. Its ability to fetch and validate profile data enhances the user experience by offering immediate feedback and maintaining a seamless editing process. This component is essential for applications that require user profile customization and provides an optimized, responsive interface for managing user information.

