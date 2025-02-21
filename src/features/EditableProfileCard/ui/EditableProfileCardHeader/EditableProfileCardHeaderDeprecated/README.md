# EditableProfileCardHeaderDeprecated

## Overview
The **`EditableProfileCardHeaderDeprecated`** component is used to display the header section of a profile card with editing capabilities. It is designed to offer a familiar interface for profile management during a transition phase when the redesigned profile components are not yet fully implemented. This component provides users with options to edit, cancel edits, and save changes, leveraging deprecated UI elements for compatibility with older application design versions.

## Type Definition 
```typescript
interface EditableProfileCardHeaderDeprecatedProps {
    onEdit: () => void;
    onCancelEdit: () => void;
    onSave: () => void;
    canEdit: boolean;
    readonly?: boolean;
    className?: string;
}
```

## Props
The **`EditableProfileCardHeaderDeprecated`** component accepts the following props:

| Prop          | Type                    | Required / Optional | Description                                                                |
|---------------|-------------------------|----------------------|----------------------------------------------------------------------------|
| `onEdit`       | `() => void`            | Required             | Callback function to trigger editing mode.                                 |
| `onCancelEdit` | `() => void`            | Required             | Callback function to cancel editing mode.                                  |
| `onSave`       | `() => void`            | Required             | Callback function to save changes made in the profile.                      |
| `canEdit`      | `boolean`               | Required             | Flag indicating whether the user has permission to edit the profile.        |
| `readonly`     | `boolean` | Optional              | Flag indicating if the profile is in read-only mode or editable.            |
| `className`    | `string`                | Optional             | Custom class name for additional styling.                                  |


## Features
1.**Editing Capabilities**: Provides buttons for editing, saving, and canceling changes, allowing users to manage their profile efficiently.

2.**Conditional Rendering**: Displays different sets of buttons based on the `readonly` and `canEdit` props, ensuring the interface adapts to the current editing state.

## Usage Example
```typescript jsx
import { EditableProfileCardHeaderDeprecated } from '@/features/EditableProfileCard/EditableProfileCardHeaderDeprecated';

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
        <EditableProfileCardHeaderDeprecated
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
The **`EditableProfileCardHeaderDeprecated`**  component plays a crucial role in maintaining user interface consistency during the transition to new profile management components. By utilizing deprecated UI elements, it ensures that users continue to have access to essential profile management functionalities while the application updates its design system.
