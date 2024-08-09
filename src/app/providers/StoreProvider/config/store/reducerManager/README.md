# createReducerManager Function

## Overview
The `createReducerManager` function is a utility designed to manage Redux reducers dynamically within a store. It allows for the addition and removal of reducers at runtime, providing flexibility in state management. This is particularly useful for applications that need to load or unload reducers based on user interactions or feature-specific requirements.

## Types 
The key types and interfaces used in this function are integral for a robust Redux setup:

- **StateSchema**: Represents the shape of the Redux state, encompassing both static and dynamic slices.
- **StateSchemaKey**: A union type for the keys of the `StateSchema`, used for identifying state slices.
- **MountedReducers**: An optional record tracking the mounted status of reducers.
- **ReducerManager**: Defines methods for managing reducers dynamically.

Additionally, the following Redux Toolkit types are used:
- **`AnyAction`**: Represents any Redux action, providing flexibility for action types in reducers.
- **`Reducer`**: A type representing a reducer function in Redux.
- **`ReducersMapObject`**: A type representing a map of reducer functions, where keys are state slice names, and values are reducer functions.

## Role and Purpose
The primary role of the `createReducerManager` function is to handle the dynamic management of reducers in a Redux store. It provides mechanisms to:
- **Add New Reducers**: Dynamically extend the store with new slices of state.
- **Remove Existing Reducers**: Cleanly remove reducers and their associated state slices.
- **Combine Reducers**: Ensure that all active reducers are combined into a single root reducer that is used to handle actions and update the state.

This dynamic management is essential for large-scale applications that need to optimize performance and manage state efficiently, especially when dealing with feature-based modules or lazy-loaded components.

## Details of Implementation

- **Parameters**

| Parameter           | Type                                | Required / Optional | Description                                                        |
|---------------------|-------------------------------------|---------------------|--------------------------------------------------------------------|
| `initialReducers`   | `ReducersMapObject<StateSchema>`    | Required            | An object containing the initial set of reducers to be used in the store. |

- **State Management**
    - **Reducers**: The `reducers` object holds the current set of reducers. It is initialized with `initialReducers` and can be modified dynamically.
    - **Combined Reducer**: The `combinedReducer` is created using `combineReducers(reducers)` and represents the root reducer that combines all individual reducers.
    - **Keys to Remove**: `keysToRemove` is an array of `StateSchemaKey` that tracks reducers that need to be removed from the state.
    - **Mounted Reducers**: `mountedReducers` is an object of type `MountedReducers` that tracks whether each reducer is currently mounted or not.

- **Methods**

    - **getReducerMap**
        - Returns the current map of reducers. This allows access to the list of all reducers currently managed by the `ReducerManager`.

    - **getMountedReducers**
        - Returns an object that indicates which reducers are currently mounted. This is useful for tracking the state of each reducer and understanding which parts of the state are active.

    - **reduce**
        - **Parameters**:
            - `state`: `StateSchema` - The current state of the Redux store, representing the entire state shape managed by the store.
            - `action`: `AnyAction` - The action to be processed, which is a plain object describing a change in the state.
        - **Description**: This method processes the given action using the combined reducer. It also handles the removal of reducers by deleting the corresponding state keys if necessary. It updates the state by removing any keys marked for removal and then applies the `combinedReducer`.

    - **add**
        - **Parameters**:
            - `key`: `StateSchemaKey` The key for the new reducer to be added.
            - `reducer`: `Reducer` The reducer function to be added.
        - **Description**: Adds a new reducer to the `reducers` map and updates the `combinedReducer`. It also marks the reducer as mounted and ensures that the new reducer is included in the combined state.

    - **remove**
        - **Parameters**:
            - `key`: `StateSchemaKey` The key of the reducer to be removed.
        - **Description**: Removes a reducer from the `reducers` map and marks it as unmounted. It adds the key to `keysToRemove`, which will be used in the next `reduce` call to delete the corresponding state slice.

## Conclusion
The `createReducerManager` function provides a flexible and efficient way to manage Redux reducers dynamically. By allowing reducers to be added and removed at runtime, it enables applications to scale and adapt to changing requirements. The function ensures that the Redux state remains manageable and optimized, particularly in scenarios involving feature-based modularity or lazy-loading of components.
