# EditableProfileCardContainer

## Overview
The **`EditableProfileCardContainer`**  component acts as a container for the `UserCard` component, managing profile-related state and handlers. 
It leverages a custom hook, `useProfile`, to obtain necessary profile data, loading state, errors, and change handlers. 
This component ensures that the `UserCard` is provided with all required props to function correctly, enabling users to view and edit their profile information.

## Props
The **`EditableProfileCardContainer`** component does not accept any props directly. It relies on the `useProfile` hook to manage its internal state and behavior.

## Features
1. **Profile Data Management**: Utilizes the `useProfile` hook to manage and provide profile data, loading states, and error handling to the `UserCard` component.

2. **Change Handlers Integration**: Supplies the `UserCard` with functions to handle changes to various profile fields, such as name, username, avatar, and city. etc.

3. **Loading and Error Handling**: Passes loading and error states to the `UserCard` to ensure that users receive appropriate feedback during data fetching and update operations.

## Usage Example
```typescript jsx
import { EditableProfileCardContainer } from '@/features/EditableProfileCard/EditableProfileCardContainer';

const ProfilePage = () => {
    return (
        <div>
            <EditableProfileCardContainer />
            {/* The EditableProfileCardContainer component manages and provides profile data to the UserCard */}
        </div>
    );
};
```
## Conclusion
The **`EditableProfileCardContainer`** component plays a crucial role in managing and providing profile data and handlers to the `UserCard`. By leveraging the `useProfile` hook, it ensures that the `UserCard` receives all necessary data and functions to enable an effective and responsive user experience for profile editing.
