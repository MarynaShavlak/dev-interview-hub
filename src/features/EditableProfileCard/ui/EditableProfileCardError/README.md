# EditableProfileCardError

## Overview
The **`EditableProfileCardError`**  component displays validation error messages related to profile data entry. It adapts its rendering based on the `isAppRedesigned` feature flag to provide either the redesigned or deprecated text display component. This ensures that error messages are consistently presented in line with the application's current design system, improving user experience during profile editing.

## Type Definition 
```typescript
interface EditableProfileCardErrorProps {
    validateErrors: ValidateProfileError[];
}
```

## Props
The **`EditableProfileCardError`** component accepts the following props:

| Prop          | Type                    | Required / Optional | Description                                                                |
|---------------|-------------------------|----------------------|----------------------------------------------------------------------------|
| `validateErrors`    | `ValidateProfileError[]`                | Required             | Array of validation error codes that need to be displayed.                                  |


## Features
1. **Feature Flag Driven**: Utilizes the `isAppRedesigned` feature flag to render either the redesigned or deprecated text components, ensuring compatibility with the application's design system.

2. **Dynamic Error Messaging**: Maps validation error codes to translated error messages, providing users with clear and contextually appropriate feedback.

3. **Error Display Handling**: Conditionally renders error messages only if there are validation errors, avoiding unnecessary UI clutter.

## Usage Example
```typescript jsx
import { EditableProfileCardError } from '@/features/EditableProfileCard/EditableProfileCardError';
import { ValidateProfileError } from '../../model/consts/consts';

const App = () => {
    const errors = [ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.NO_DATA];

    return (
        <div>
            <EditableProfileCardError validateErrors={errors} />
            {/* The EditableProfileCardError component will display appropriate error messages based on validation errors */}
        </div>
    );
};

```
## Conclusion
The **`EditableProfileCardError`** component enhances the profile editing experience by providing a feature-flag-driven approach to displaying validation errors. Its dynamic error messaging and compatibility with both redesigned and deprecated UI components ensure a seamless and user-friendly experience during profile data entry and validation.
