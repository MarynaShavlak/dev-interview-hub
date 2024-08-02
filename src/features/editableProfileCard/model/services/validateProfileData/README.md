# validateProfileData Function

The `validateProfileData` function performs validation checks on the provided profile data and returns an array of errors based on the validation results.

## Purpose
The function ensures that the profile data contains all required fields and that the values of these fields meet the expected criteria. If the data is incomplete or incorrect, the function returns specific error codes, facilitating the identification and correction of invalid profile data.

## Parameters:

| Parameter | Type       | Description                                                        |
|-----------|------------|--------------------------------------------------------------------|
| `profile`  | `Profile`   |  The profile data to be validated. This parameter is optional. |

## Returns:
An array of `ValidateProfileError` codes indicating the validation errors found in the profile data. If the data is valid, the array will be empty..

## Usage Example:
```typescript
import { Profile } from '@/entities/Profile';
import { validateProfileData, ValidateProfileError } from './validateProfileData';

const profile: Profile = {
    first: 'John',
    lastname: 'Doe',
    age: 30,
    username: 'johndoe',
};

const errors = validateProfileData(profile);
// errors: []

const invalidProfile: Profile = {
    first: '',
    lastname: '',
    age: 'twenty',
    username: '',
};

const validationErrors = validateProfileData(invalidProfile);
// validationErrors: [
//   ValidateProfileError.INCORRECT_USER_DATA,
//   ValidateProfileError.INCORRECT_AGE,
//   ValidateProfileError.INCORRECT_USERNAME
// ]
```
