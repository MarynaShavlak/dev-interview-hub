# EditableProfileCardHeader

## Overview
The **`EditableProfileCardHeader`**  component dynamically switches between the `RedesignedEditableProfileCardHeader` and `DeprecatedEditableProfileCardHeader` components based on the `isAppRedesigned` feature flag. 
This approach ensures that users interact with either the updated or legacy interface depending on the application's current configuration. 
It facilitates profile management by providing options to edit, save, or cancel changes in the profile header.

## Type Definition 
```typescript
interface EditableProfileCardHeaderProps {
    className?: string;
}
```

## Props
The **`EditableProfileCardHeader`** component accepts the following props:

| Prop          | Type                    | Required / Optional | Description                                                                |
|---------------|-------------------------|----------------------|----------------------------------------------------------------------------|
| `className`    | `string`                | Optional             | Custom class name for additional styling.                                  |


## Features
1. **Feature Flag Driven**: Adapts between the redesigned and deprecated profile card header interfaces based on the `isAppRedesigned` feature flag, providing a consistent design experience aligned with the application's configuration.

2. **User Profile Management**: Facilitates profile editing by providing functionalities to edit, save, or cancel changes.

3. **Integrated State Management**: Utilizes Redux actions and selectors to manage profile editing states and handle data updates efficiently.

## Usage Example
```typescript jsx
import { EditableProfileCardHeader } from '@/features/editableProfileCardr/EditableProfileCardHeader';

const ProfileHeader = () => {
    return (
        <EditableProfileCardHeader className="profile-header" />
    );
};
```
## Conclusion
The **`EditableProfileCardHeader`**  component plays a crucial role in maintaining flexibility and user experience during the transition to a new design system. By leveraging feature flags, it provides a seamless interface for profile management, whether through updated or legacy components, ensuring users can effectively edit and manage their profile information in alignment with the application’s current design standards.

