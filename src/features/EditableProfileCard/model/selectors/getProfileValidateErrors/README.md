# Documentation for Profile Validation Errors   Selectors

## Overview
These selectors are designed to access the validation errors related to the profile within the Redux store. They provide a structured approach to retrieve and manage validation error information, which is crucial for handling user input validation and displaying appropriate error messages.

## Import Statements
```typescript
import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';
```
- `buildSelector`: A utility function for creating a selector that includes a hook for easier component integration.
- `StateSchema`: A TypeScript type representing the shape of the Redux store's state.

## Selectors

### `useProfileValidateErrors` and `getProfileValidateErrors`
```typescript
export const [useProfileValidateErrors, getProfileValidateErrors] =
        buildSelector((state: StateSchema) => state.profile?.validateErrors);
```
- **Purpose**: These selectors provide access to the profile's validation errors from the Redux store.
- **Parameters**:
    - `state`: The entire Redux store state, adhering to the `StateSchema` type.
- **Returns**:
    - `getProfileValidateErrors`: A selector function that returns the `validateErrors` from the `profile` object in the Redux store.
    - `useProfileValidateErrors`: A custom hook that uses the `getProfileValidateErrors` selector to obtain the validation errors directly within React components.
- **Usage**:
    - `getProfileValidateErrors`: Use this selector for accessing the profile validation errors in non-component code or server-side logic.
    - `useProfileValidateErrors`: Utilize this custom hook within React components to directly access the profile validation errors from the Redux store.

## Usage Examples
```typescript jsx
import { useProfileValidateErrors } from '@/features/EditableProfileCard';

eexport function ProfileValidationErrors() {
  const validateErrors = useProfileValidateErrors();

  return (
          <div>
            {validateErrors && validateErrors.length > 0 ? (
                    <ul>
                      {validateErrors.map((error, index) => (
                              <li key={index}>{error}</li>
                      ))}
                    </ul>
            ) : (
                    <p>No validation errors.</p>
            )}
          </div>
  );
}
```

## Conclusion
These selectors streamline the process of managing and displaying profile validation errors. By integrating these selectors into your application, you can efficiently handle user input validation and provide clear feedback to users, leading to a more robust and user-friendly experience.
