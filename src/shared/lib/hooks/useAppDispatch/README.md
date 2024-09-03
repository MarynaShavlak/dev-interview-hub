# useAppDispatch hook
The `useAppDispatch` hook is a custom React hook that simplifies the use of the Redux dispatch function with TypeScript. It integrates with the application's specific Redux setup to ensure type safety and prevent runtime errors related to dispatching actions.

##  Problem Addressed
When using Redux with TypeScript, managing typed dispatch calls can be cumbersome and error-prone. Common issues include:
1. **Incorrect Action Types**: Without proper typing, dispatching actions can lead to runtime errors or type mismatches.
2. **Manual Type Definitions**: Manually specifying action types for each dispatch call can be repetitive and error-prone.
3. **Inconsistent Typing**: Ensuring that the dispatched actions are consistent with the Redux store configuration can be challenging

## Solution
The `useAppDispatch` hook addresses these problems by providing:

1. **Typed Dispatch**: The hook returns a `dispatch` function typed with `AppDispatch`, which is derived from the Redux store configuration. This ensures that all dispatched actions are correctly typed.
2. **Automatic Type Inference**: By utilizing the `AppDispatch` type from `createReduxStore`, it automatically reflects the store's action types, reducing manual type definitions and improving code safety.
3. **Simplified Integration**: The hook integrates seamlessly with the Redux setup, ensuring that actions dispatched throughout the application adhere to the expected types, enhancing maintainability and reducing runtime errors.

## Parameters
This hook does not accept any parameters.

## Returns
`dispatch`: A function typed with `AppDispatch`, which is used to dispatch actions to the Redux store. This type is automatically inferred from the store's configuration, ensuring that the dispatched actions adhere to the correct types.

## Usage Example 
```typescript jsx
import React from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { someAction } from '@/store/actions';

const MyComponent = () => {
   const dispatch = useAppDispatch();

   const handleClick = () => {
      dispatch(someAction());
   };

   return <button onClick={handleClick}>Dispatch Action</button>;
};
```

## Conclusion
The `useAppDispatch` hook is a valuable tool for managing typed Redux dispatch calls in TypeScript applications. 
By leveraging the `AppDispatch` type derived from the Redux store configuration, it ensures that all dispatched actions are correctly typed and aligned with the store’s setup. 
This approach eliminates login issues such as incorrect action types and manual type definitions, leading to cleaner, more maintainable code. 
By integrating `useAppDispatch` into your project, you can achieve consistent type safety, reduce the risk of runtime errors, and streamline your state management with Redux.
