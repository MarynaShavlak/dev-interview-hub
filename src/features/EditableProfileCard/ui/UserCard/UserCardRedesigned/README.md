# RedesignedUserCard

## Overview
The **`RedesignedUserCard`** component is a modern user profile interface designed to provide a visually appealing and functional experience for managing user details. It replaces older profile card implementations with an updated design that enhances usability and aligns with current UI trends. This component is equipped with various input fields and selectors to edit profile information, including avatar, personal details, and preferences.

## Props
The **`RedesignedUserCard`** component accepts the following props:

| Prop                | Type                           | Required / Optional | Description                                                                            |
|---------------------|--------------------------------|----------------------|----------------------------------------------------------------------------------------|
| `className`          | `string`                        | Optional             | Custom class name for additional styling.                                              |
| `data`               | `Profile`               | Optional             | The profile data to be displayed in the card.                                           |
| `readonly`           | `boolean`                       | Optional              | Flag indicating whether the profile card is in read-only mode or editable.             |
| `onChangeFirstname`  | `(value: string) => void`       | Optional              | Callback function to handle changes in the first name input.                           |
| `onChangeLastname`   | `(value: string) => void`       | Optional              | Callback function to handle changes in the last name input.                            |
| `onChangeAge`        | `(value: string) => void`       | Optional              | Callback function to handle changes in the age input.                                  |
| `onChangeCity`       | `(value: string) => void`       | Optional              | Callback function to handle changes in the city input.                                 |
| `onChangeUsername`   | `(value: string) => void`       | Optional              | Callback function to handle changes in the username input.                             |
| `onChangeAvatar`     | `(value: string) => void`       | Optional              | Callback function to handle changes in the avatar URL input.                            |
| `onChangeCurrency`   | `(value: Currency) => void`       | Optional              | Callback function to handle changes in the currency selection.                         |
| `onChangeCountry`    | `(value: Country) => void`       | Optional              | Callback function to handle changes in the country selection.                          |


## Features
1.**Editable Fields**: Provides input fields for essential profile information including name, age, city, username, avatar URL, and preferences like currency and country. Fields can be set to read-only mode based on the `readonly` prop.

## Usage Example
```typescript jsx
import { RedesignedUserCard } from '@/entities/UserCard/RedesignedUserCard';

const UserProfile = () => {
    const handleUsernameChange = (value: string) => {
        console.log('Username changed:', value);
    };

    // Define other handlers similarly...

    return (
        <RedesignedUserCard
            className="profile-card"
            data={/* profile data */}
            readonly={false}
            onChangeUsername={handleUsernameChange}
            onChangeFirstname={/* handler */}
            onChangeLastname={/* handler */}
            onChangeAge={/* handler */}
            onChangeCity={/* handler */}
            onChangeAvatar={/* handler */}
            onChangeCurrency={/* handler */}
            onChangeCountry={/* handler */}
        />
    );
};
```
## Conclusion
The **`RedesignedUserCard`** component is a comprehensive solution for modern profile management. It offers a well-designed interface for viewing and editing user information, incorporating both flexibility and enhanced usability. By replacing outdated components with this new design, it aligns with contemporary standards and provides a seamless experience for users.
