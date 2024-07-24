# ForceUpdateProvider Component

## Overview
The `ForceUpdateProvider` component and its accompanying `useForceUpdate` hook provide a mechanism to force re-renders within a React application. 
It offers a mechanism to forcefully refresh parts of the interface, addressing scenarios where non-reactive features control the design changes. 
This ensures that all components reflect the current state without manually handling extensive state management.
This can be useful in scenarios where state changes are required to trigger component updates that are not automatically re-rendered.

## Role and Purpose:
The component and hook enable controlled and explicit re-rendering of child components by toggling a boolean state. 
This ensures that updates propagate through the component tree when necessary, enhancing the ability to manage complex state transitions and side effects.

##  Problem Addressed
In applications where interface design changes are controlled by non-reactive features, parts of the interface may remain outdated, leading to inconsistencies:
1. **Partial Interface Updates:**: Non-reactive features can cause only parts of the interface to update, leaving other parts outdated.
2. **Complex State Management:**: Managing feature changes through context or Redux state can be cumbersome and might lose the ability to use feature flags in non-React parts of the application.
3. **Context Integration**: Reliance on manual state updates increases the risk of inconsistencies and errors, especially when dealing with non-reactive features..

## Solution
The `ForceUpdateProvider` and `useForceUpdate` hook address these problems by providing:
1. **Forced Updates**: A `forceUpdate` function that triggers a refresh of the interface, ensuring all components are updated.
2. **Session-Based Updates**: It leverages non-reactive data, assuming features remain constant within a session and allowing page reloads for feature updates.
3. **Avoiding State Complexity**: It avoids using context or Redux for features, maintaining the ability to use feature flags in helper functions or other non-React parts of the application.


## Implementation Details 

### Props 
| Prop       | Type      | Required / Optional                     | Description                                          |
|------------|-----------|-----------------------------------------|------------------------------------------------------|
| `children`  | `ReactNode` | Required                                | The child components that will have access to the force update context provided by this component.       |

### State

| State      | Type    | Description        | 
|------------|---------|--------------------|
| `value` | boolean | A boolean state used to toggle and force updates. |

### Context
The `ForceUpdateContext` provides the current `value` state and the `forceUpdate` function to its consumers. 
This context can be consumed by other components to access the `forceUpdate` function.

### Internal work 

1. **Provider Component**: `The ForceUpdateProvider` component defines and manages the `forceUpdate` function which toggles the `value` state and ensures re-renders.
2. **Context**: The `ForceUpdateContext` provides both the `value` state and the `forceUpdate` function to its consumers.
3. **Hook**: The `useForceUpdate` hook accesses the `forceUpdate`  function from the context, allowing components to trigger a force update when needed.

The context is created with a `value` of true. The `forceUpdate` function toggles this state between `true` and `false`. 
In the provider, a state is created and its value is changed from `false` to `true `and back.
During this toggle, the children components are briefly unmounted (set to `null`) and then re-mounted, ensuring that the updated components re-render correctly.
It also sets a timeout to revert the state after 120 milliseconds, ensuring a controlled re-render process.
This approach ensures that non-reactive values in the interface are refreshed appropriately.

## Usage Example 

### Main Application Entry Point
```typescript jsx
import { createRoot } from 'react-dom/client';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';
import App from './app/App';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'The root container was not found. FAILED to mount the react application',
    );
}

const root = createRoot(container);

root.render(
    <ForceUpdateProvider>
        <App />
    </ForceUpdateProvider>
);
```

### UiDesignSwitcher Component
This component allows the user to switch between old and new UI designs.

```typescript jsx
import { memo, useState } from 'react';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const isAppRedesigned = getFeatureFlag('isAppRedesigned');
    const dispatch = useAppDispatch();
    const authData = useUserAuthData();
    const [isLoading, setIsLoading] = useState(false);
    const forceUpdate = useForceUpdate();

    const items = [
        {
            content: 'Новий',
            value: 'new',
        },
        {
            content: 'Старий',
            value: 'old',
        },
    ];

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);
            await dispatch(
                updateFeatureFlag({
                    userId: authData.id,
                    newFeatures: {
                        isAppRedesigned: value === 'new',
                    },
                }),
            ).unwrap();
            setIsLoading(false);
            forceUpdate();
        }
    };

    return (
        <HStack gap="16">
            <Text text='Варіант інтерфейсу' />
            {isLoading ? (
                <Skeleton width={100} height={40} />
            ) : (
                <ListBox
                    onChange={onChange}
                    items={items}
                    value={isAppRedesigned ? 'new' : 'old'}
                />
            )}
        </HStack>
    );
});
```
## Conclusion 
The `ForceUpdateProvider` component and `useForceUpdate` hook are essential tools for managing interface updates when dealing with non-reactive features. 
They provide a simple yet effective way to ensure consistent updates across the application, reducing complexity and enhancing maintainability. 
This approach supports the use of non-reactive data and feature flags, aligning with the assumption that features remain constant within a session and simplifying state management.
