# `userApi`: API Documentation

## Overview

The `userApi` is a set of endpoints created using `rtkApi` for managing user data and settings. This API provides functionalities to update user settings and retrieve user information by their ID, facilitating user management and customization.

## Description
The `userApi` includes two primary endpoints:
- `getUserDataById`: A **query** endpoint to fetch user data by a specific user ID.
- `setJsonSettings`: A **mutation** endpoint to update the JSON settings for a specific user.

These endpoints utilize Redux Toolkit Query for efficient data fetching and state management, enhancing the overall user experience.

### Import Details
- `rtkApi`: The base API service from **'@/shared/api/rtkApi'**.
- `User`: The type definition for user data from **'../model/types/user'**.
- `JsonSettings`: The type definition for JSON settings from **'../model/types/jsonSettings'**.

###  Parameters
`getUserDataById` Query expects a single parameter:

| Parameter  | Type              | Description                                                                                                                       |
|------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `userId`   | `string`          | The unique identifier of the user whose data is to be retrieved.                                                                                                                                  |

`setJsonSettings` Mutation expects an object containing the following properties:

| Parameter   | Type     | Description                                                                                                                       |
|-------------|----------|-----------------------------------------------------------------------------------------------------------------------------------|
| `userId`    | `string` | The unique identifier of the user whose settings are to be updated.                                                                                                                            |
| `jsonSettings`      | `JsonSettings` | The new JSON settings to be applied to the user.                                                                                                                              |


### Type Parameters 
1. For `getUserDataById`-  `<User, string>`:
   - `User`  indicates that the query returns a user object.
   - `string` defines the shape of the argument object expected by the query.

2. For `setJsonSettings`-  `<User, SetJsonSettingsArg>`:
    - `User` indicates that the mutation returns a user object with updated settings.
    - `SetJsonSettingsArg` defines the shape of the argument object expected by the mutation.

### Query Functions

1. `getUserDataById`
The `query` function constructs the request object, setting the URL to `/users/${userId}` and the HTTP method to GET
2. `setJsonSettings`
   The `query` function constructs the request object, setting the URL `to /users/${userId}`, the HTTP method to PATCH, and including the `jsonSettings` in the request body.

### Exported Endpoints
- `getUserDataByIdQuery`: An action creator for initiating the `getUserDataById` query. This allows you to manually dispatch the query to fetch user data by ID.
- `setJsonSettingsMutation`: An action creator for initiating the `setJsonSettings` mutation. This allows you to manually dispatch the mutation to update user settings.

## Usage Examples
### Example 1: Updating User Settings
```typescript
export const saveJsonSettings = createAsyncThunk<
        JsonSettings,
        JsonSettings,
        ThunkConfig<string>
        >('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
   const { rejectWithValue, getState, dispatch } = thunkApi;
   const userData = getUserAuthData(getState());
   const currentSettings = getJsonSettings(getState());

   if (!userData) {
      return rejectWithValue('No user data found.');
   }

   try {
      const response = await dispatch(
              setJsonSettingsMutation({
                 userId: userData.id,
                 jsonSettings: {
                    ...currentSettings,
                    ...newJsonSettings,
                 },
              }),
      ).unwrap();

      if (!response || !response.jsonSettings) {
         return rejectWithValue('Failed to retrieve updated JSON settings');
      }

      return response.jsonSettings;
   } catch (error) {
      console.error('Error saving JSON settings:', error);
      return rejectWithValue('An error occurred while saving JSON settings.');
   }
});
```

### Example 2: Initiate use
```typescript
export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!userId) {
            return rejectWithValue('No user ID found in local storage.');
        }

        try {
            const response = await dispatch(
                getUserDataByIdQuery(userId),
            ).unwrap();

            localStorage.setItem(
                LOCAL_STORAGE_LAST_DESIGN_KEY,
                response.features?.isAppRedesigned ? 'new' : 'old',
            );

            return response;
        } catch (error) {
            console.error('Error during auth initialization:', error);
            return rejectWithValue('Failed to initialize auth data.');
        }
    },
);
```

## Conclusion
The `userApi` offers crucial functionality for managing user settings and retrieving user information, essential for creating dynamic and personalized user experiences. 
By leveraging Redux Toolkit Query, this API ensures efficient state management and data fetching, making it straightforward to integrate user-related functionalities into your application. The use of type parameters `<User, SetJsonSettingsArg>` and `<User, string>` guarantees type safety and clear expectations for the arguments and responses of the queries and mutations. This setup not only enhances code reliability and prevents runtime errors but also simplifies data handling, allowing for more responsive and customized user interactions within your application.
