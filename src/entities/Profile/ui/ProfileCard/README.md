# ProfileCard 

## Overview
The **`ProfileCard`** component provides a user interface for displaying and editing user profile information. 
It adapts its rendering based on the `isAppRedesigned` feature flag, switching between the `RedesignedProfileCard` and `DeprecatedProfileCard` components to deliver either the latest design or the legacy version. 
The component handles different states including loading, error, and data display, ensuring a smooth user experience across various scenarios.

## Props
The **`RedesignedProfileCard`** component accepts the following props:

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
1. **Adaptive Design**: Utilizes the `isAppRedesigned` feature flag to render either the redesigned or deprecated profile card, providing consistency with the application's design system.
2. **State Handling**: Manages different states such as loading and error conditions gracefully, ensuring that users receive appropriate feedback during interactions.
3. **Editable Profile**: Offers various callbacks for updating profile information, enabling customization based on user actions and preferences.



## Usage Example
```typescript jsx
import { memo } from 'react';
import { useProfile } from '../../lib/hooks/useProfile';
import { ProfileCard } from '@/entities/Profile';

export const EditableProfileCardContainer = memo(() => {
    const {
        formData,
        error,
        isLoading,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeUsername,
        onChangeAvatar,
        onChangeCountry,
        onChangeCurrency,
        onChangeAge,
        onChangeCity,
    } = useProfile();

    return (
        <ProfileCard
            data={formData}
            isLoading={isLoading}
            error={error}
            readonly={readonly}
            onChangeFirstname={onChangeFirstname}
            onChangeLastname={onChangeLastname}
            onChangeAge={onChangeAge}
            onChangeCity={onChangeCity}
            onChangeUsername={onChangeUsername}
            onChangeAvatar={onChangeAvatar}
            onChangeCurrency={onChangeCurrency}
            onChangeCountry={onChangeCountry}
        />
    );
});
```
## Conclusion
The **`ProfileCard`** entity is essential for managing and displaying user profile information in both redesigned and legacy formats. It ensures that users have a consistent and responsive experience, regardless of the application's current feature set. By handling loading states, errors, and providing various callback functions, it allows for a robust and interactive profile management system that adapts to different design requirements and user needs.
