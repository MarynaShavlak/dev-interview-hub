# ProfileContainer

## Overview
The **`ProfileContainer`** is responsible for rendering the `EditableProfileCard` component within a vertically stacked layout. It utilizes the `useParams` hook from `react-router-dom` to retrieve the profile ID from the URL, passing it down to the `EditableProfileCard`. This setup allows for a dynamic and user-specific profile editing experience.

## Props
The `ProfileContainer` component does not accept any props.

## Features
1. **Dynamic Profile Loading**: Utilizes the `useParams` hook to dynamically extract the profile ID from the URL, ensuring the correct profile data is loaded and editable.

2. **Responsive Layout**: Utilizes the `VStack` component from the redesigned stack UI to create a vertically stacked layout with configurable spacing, ensuring a clean and responsive design.
3. 
## Usage Example
```typescript jsx
import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { ProfileContainer } from '../ProfileContainer/ProfileContainer';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
    return (
        <Page
            className={className}
            data-testid="ProfilePage"
        >
            <ProfileContainer />
        </Page>
    );
});

export default ProfilePage;
```

## Conclusion
The **`ProfileContainer`**  component serves as a dedicated container to manage and display user profiles dynamically. 
By encapsulating the logic to fetch and pass the profile ID to the `EditableProfileCard`, it centralizes profile-related functionalities, making the codebase more maintainable and the user interface more consistent.
