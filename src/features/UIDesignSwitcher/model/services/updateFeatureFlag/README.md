#  `updateFeatureFlag` Thunk Documentation

The `updateFeatureFlag` thunk is an asynchronous action that updates feature flags for a specific user, merges new flags with existing ones, communicates the changes to the backend, and refreshes the application to ensure consistent application of the updated flags.

## Parameters

### `UpdateFeatureFlagOptions`:
This interface defines the structure of the input object for the thunk:

| Parameter  | Type                    | Description                                     |
|------------|-------------------------|-------------------------------------------------|
| `userId`   | `string`                | The unique identifier of the user whose feature flags are being updated. |
| `newFeatures` | `Partial<FeatureFlags>` | A partial object representing the new feature flags to be applied. Allows updating only the flags that need to be changed without affecting others.  |

## Returns

`Promise<void>`: 
- **On Success**: Resolves when the update is complete. It does not return data as its primary function is to perform side effects (update feature flags and reload the page).
- **On Error**: If the update fails, the promise is rejected with the error message `'An error occurred while updating feature flags.'`.



## Internal Behavior
1. **Merging Feature Flags**: Combines the current feature flags with the new ones provided in the `newFeatures` object. This is achieved by spreading the existing flags and new flags together.
2. **Updating Backend**: Dispatches the `updateFeatureFlagsMutation` action to update the feature flags on the backend. This ensures that the server has the latest feature flags for the user.
3. **Setting Local Flags**: Updates the local feature flags using `setFeatureFlags` to keep the client-side state in sync with the server-side data.
4. **Refreshing the Page**: Since feature flags are not reactive and do not trigger automatic updates in the interface, the application is reloaded using `window.location.reload()`. This ensures that the updated feature flags are applied consistently throughout the application.

## Error Handling

The thunk catches and handles errors during the update process. If an error occurs, it returns a rejected promise with the message `'An error occurred while updating feature flags.'`.
This approach ensures that issues related to feature flag updates can be identified and addressed promptly.

## Usage Example
`UiDesignSwitcher` component allows users to switch between different UI designs by updating a feature flag that controls whether a redesigned UI is used. This example demonstrates how to manage feature flags in a React application.

```typescript jsx
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { useUserAuthData } from '@/entities/User';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const UiDesignSwitcher = memo(() => {
    const { t } = useTranslation();
    const isAppRedesigned = getFeatureFlag('isAppRedesigned');
    const dispatch = useAppDispatch();
    const authData = useUserAuthData();
    const forceUpdate = useForceUpdate();

    const items = [
        { label: t('Новий'), value: 'new' },
        { label: t('Старий'), value: 'old' },
    ];

    const onChange = async (value: string) => {
        if (authData) {
            await dispatch(
                updateFeatureFlag({
                    userId: authData.id,
                    newFeatures: {
                        isAppRedesigned: value === 'new',
                    },
                }),
            ).unwrap();
            forceUpdate();
        }
    };

    return (
        <ListBox
            onChange={onChange}
            items={items}
            value={isAppRedesigned ? 'new' : 'old'}
            className={className}
        />
    );
});
```

## Conclusion 
The `updateFeatureFlag` hunk provides a robust mechanism for updating feature flags on a per-user basis
It efficiently merges new flags with existing ones, communicates changes to the backend, and ensures that updates are reflected across the application by reloading the page. 
Error handling is implemented to capture and report any issues during the update process, contributing to a reliable and consistent user experience.
