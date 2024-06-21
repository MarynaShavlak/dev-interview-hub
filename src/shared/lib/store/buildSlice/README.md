# Documentation for '_buildSlicer_' Function

## Overview
The **_'buildSlice'_** function enhances the functionality of creating Redux slices by providing an encapsulated hook (**_'useActions'_**) that binds dispatch actions, thus reducing the need to repeatedly use **_'useDispatch'_** within components.


## Purpose
The purpose of **_'buildSlice'_**  is to streamline the creation of Redux slices while integrating a custom hook (**_'useActions'_**) that simplifies the dispatch of actions across components.

## Function Definition
**Imports**
```typescript
import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist';
import { useMemo } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch'; 
```

**Function Implementation**
```typescript
export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
    // Create a Redux slice using the provided options
    const slice = createSlice(options);

    // Define a custom hook `useActions` to bind action creators to dispatch
    const useActions = (): typeof slice.actions => {
        // Access the Redux dispatch function from a custom hook useDispatch (e.g., `useAppDispatch`)
        const dispatch = useAppDispatch(); // Custom hook useAppDispatch, using useDispatch with AppDispatch type

        // Memoize the bound action creators to optimize performance
        return useMemo(() => bindActionCreators(slice.actions, dispatch), [dispatch]);
    };

    // Return an object that includes the Redux slice and the custom `useActions` hook
    return {
        ...slice, // Includes `reducer`, `actions`, and `name` properties from the Redux slice
        useActions, // A custom hook that encapsulates the dispatching of actions
    };
}

```

## Usage

To use **_'buildSlice'_**, you first define a Redux slice by calling **_'buildSlice'_** with appropriate **_'CreateSliceOptions'_**. This function returns an object that includes the slice's reducer, actions, and a custom **_'useActions'_** hook.

Here's an example of how you might use it:

```typescript
import { PayloadAction } from '@reduxjs/toolkit';
import { CounterSchema } from '../types/counterSchema';
import { buildSlice } from '@/shared/lib/store';

const initialState: CounterSchema = {
    value: 0,
};

export const counterSlice = buildSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        add: (state, { payload }: PayloadAction<number>) => {
            state.value += payload;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

export const {
    actions: counterActions,
    reducer: counterReducer,
    useActions: useCounterActions,
} = counterSlice;
```
**Using in a Component**

```typescript
const CounterComponent = () => {
    const { count } = useSelector((state: StateSchema) => state.counter);
    const { incremenet, decrement, reset, add } = useCounterActions();

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => increment()}>Increment</button>
            <button onClick={() => decrement()}>Decrement</button>
            <button onClick={() => add(5)}>Add 5</button>
            <button onClick={() => reset()}>Reset</button>
        </div>
    );
};
```

## Advantages
- **Encapsulation**: Bundles slice creation and action binding in one function.
- **Simplicity**: Reduces boilerplate by avoiding repetitive **_'useDispatch'_** calls in components.
- **Type Safety**: Maintains TypeScript type safety with correctly typed action creators and dispatch methods.
## Conclusion
The **_'buildSlice'_** function serves as a powerful utility function that enhances the Redux toolkit by facilitating the creation of Redux slices with minimal boilerplate code.

It leverages TypeScript generics to ensure type safety throughout the slice creation process. The inclusion of the **_'useActions'_** hook simplifies the integration of Redux state management(the process of dispatching actions) with React components, promoting cleaner, more maintainable code in complex applications.

By encapsulating Redux slice creation and action binding, **_'buildSlice'_** contributes to a robust and scalable architecture for managing application states effectively.
