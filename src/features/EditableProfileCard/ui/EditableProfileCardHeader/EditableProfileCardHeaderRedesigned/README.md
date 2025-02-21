# EditableProfileCardHeaderRedesigned

## Overview
The **`EditableProfileCardHeaderRedesigned`**  component is part of the updated profile management interface, providing users with a modern and intuitive header for editing profile details. 
Rendered when the feature flag `isAppRedesigned` is `true`, it replaces the deprecated header component with an improved UI. 
This component integrates the latest design elements to enhance user interaction and maintain a cohesive look across the application.

## Type Definition 
```typescript
interface EditableProfileCardHeaderRedesignedProps {
    onEdit: () => void;
    onCancelEdit: () => void;
    onSave: () => void;
    canEdit: boolean;
    readonly?: boolean;
    className?: string;
}
```

## Props
The **`EditableProfileCardHeaderRedesigned`** component accepts the following props:

| Prop          | Type                    | Required / Optional | Description                                                                |
|---------------|-------------------------|----------------------|----------------------------------------------------------------------------|
| `onEdit`       | `() => void`            | Required             | Callback function to trigger editing mode.                                 |
| `onCancelEdit` | `() => void`            | Required             | Callback function to cancel editing mode.                                  |
| `onSave`       | `() => void`            | Required             | Callback function to save changes made in the profile.                      |
| `canEdit`      | `boolean`               | Required             | Flag indicating whether the user has permission to edit the profile.        |
| `readonly`     | `boolean` | Optional              | Flag indicating if the profile is in read-only mode or editable.            |
| `className`    | `string`                | Optional             | Custom class name for additional styling.                                  |


## Features
1. **Editing Capabilities**: Provides buttons for editing, saving, and canceling changes, allowing users to manage their profile efficiently.

2. **Conditional Rendering**: Displays different sets of buttons based on the `readonly` and `canEdit` props, ensuring the interface adapts to the current editing state.

3. **Modern UI**: Incorporates updated design elements to provide a contemporary and user-friendly interface.

## Usage Example
```typescript jsx
import { EditableProfileCardHeaderRedesigned } from '@/features/EditableProfileCardHeader/EditableProfileCardHeaderRedesigned';

const ProfileHeader = () => {
    const handleEdit = () => {
        console.log('Edit button clicked');
    };

    const handleCancelEdit = () => {
        console.log('Cancel edit button clicked');
    };

    const handleSave = () => {
        console.log('Save button clicked');
    };

    return (
        <EditableProfileCardHeaderRedesigned
            className="profile-header"
            onEdit={handleEdit}
            onCancelEdit={handleCancelEdit}
            onSave={handleSave}
            canEdit={true}
            readonly={false}
        />
    );
};
```
## Conclusion
The **`EditableProfileCardHeaderRedesigned`** component is an integral part of the revamped profile management interface, offering users a modern and efficient way to manage profile information. By replacing outdated UI elements with a fresh design, it aligns with the latest application standards and enhances the overall user experience.
