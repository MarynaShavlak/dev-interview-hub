# useInitialEffect hook
The `useInitialEffect` hook is designed to execute a callback function only once when a component is initially mounted, with support for excluding certain environments like Storybook or Jest. 
This is particularly useful for performing setup tasks or side effects that should only occur when the component first renders.

##  Problem Addressed
Managing initial side effects in a React component can be challenging, especially when dealing with environments that require different handling (e.g., Storybook or Jest). Without a specialized hook, developers might encounter issues such as:

1. **Redundant Execution**: Side effects running multiple times or inappropriately during tests or in Storybook.
2. **Environment-Specific Handling**: Difficulty in conditionally handling side effects based on the environment.

## Solution
The `useInitialEffecte` hook streamlines theme management by providing:

1. **Single Execution**: Ensuring the callback function is executed only once when the component is first mounted.
2. **Environment Awareness**: Excluding execution in specified environments like Storybook or Jest to prevent unnecessary operations during testing or development.

## Parameters
The `useInitialEffect` hook accepts a single parameter:

| Parameter | Type       | Description                                                      |
|-----------|--------------------------|------------------------------------------------------------------|
| `callback`   | `() => void`      | A function to be executed only once when the component is first mounted.|


## Returns

The `useInitialEffect` hook does not return any values. It solely executes the provided `callback` function on the initial mount.

## Internal Behavior
1. **Effect Execution**:
   The hook uses the `useEffect` hook with an empty dependency array (`[]`), ensuring that the callback function is executed only once after the initial render.

2. **Environment Check:**:
   The callback function is only executed if the environment is not Storybook or Jest. 
    This is controlled by the `__PROJECT__` variable, which determines the current environment.
   In Storybook, we want to avoid executing memory-intensive operations like server requests. 
   To address this, we have a define plugin that declares global variables, including `__PROJECT__`. 
   This variable can be set to `storybook`, `frontend`, or `jest` to represent the respective environments. 
   Each environment has its own configuration, and the `__PROJECT__` variable helps in overriding behavior as needed.

## Usage Example 
This example shows how to use the `useInitialEffect` hook in a complex component where initialization logic is needed.

```typescript jsx
import React, { memo, useCallback } from 'react';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchData } from './services/fetchData';
import { initializeComponent } from './services/initializeComponent';

interface ComplexComponentProps {
   className?: string;
}

const ComplexComponent = ({ className }: ComplexComponentProps) => {
   const dispatch = useAppDispatch();

   const onFetchData = useCallback(() => {
      dispatch(fetchData());
   }, [dispatch]);

   useInitialEffect(() => {
      dispatch(initializeComponent());
      onFetchData();
   });

   return <div className={className}>Complex Component Content</div>;
};

export default memo(ComplexComponent);
```

## Conclusion
The `useInitialEffect` hook simplifies the management of initial side effects in React components by ensuring that callback functions are executed only once upon initial mount. It also provides flexibility for excluding certain environments, making it a valuable tool for both development and testing scenarios. 
By using the `useInitialEffect` hook, developers can ensure more predictable and efficient initialization of component logic.
