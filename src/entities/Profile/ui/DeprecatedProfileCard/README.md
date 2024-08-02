# DeprecatedProfileCard

## Overview
The **`DeprecatedProfileCard`** component represents the legacy profile card interface, designed to handle user profile information with deprecated UI elements. This component provides a familiar interface for users during the transition to a redesigned profile card, allowing for profile data management including avatar, personal details, and selection of currency and country. It integrates deprecated UI components while maintaining essential functionality and visual consistency with the older design system.

## Props

The **`DeprecatedProfileCard`** component accepts the following props:

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
1.**Editable and Read-Only Modes**: Supports both editable and read-only modes, allowing for user interaction or display-only scenarios based on the `readonly` prop.


## Usage Example
```typescript jsx
import { DeprecatedProfileCard } from '@/entities/Profile/DeprecatedProfileCard';

const UserProfile = () => {
    const handleUsernameChange = (value: string) => {
        console.log('Username changed:', value);
    };

    // Define other handlers similarly...

    return (
        <DeprecatedProfileCard
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
The **`DeprecatedProfileCard`** component plays a critical role in maintaining legacy user interface consistency while transitioning to a redesigned profile management system. By leveraging outdated UI elements and providing essential profile data management functionalities, it ensures continuity in user experience during the design upgrade process.
