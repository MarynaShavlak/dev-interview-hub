# Documentation for `TestAsyncThunk` Class

## Overview
The `TestAsyncThunk` class facilitates the testing of Redux async thunks in TypeScript, offering a structured approach to mock dependencies and execute thunk actions in controlled test environments. It includes deep mocking of external dependencies like Axios to ensure comprehensive testing.


## Imports and Dependencies
```typescript
import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';
import { StateSchema } from '@/app/providers/StoreProvider';
```
- `AsyncThunkAction`: A type from Redux Toolkit representing an asynchronous thunk action.
- `axios`, `AxiosStatic`: The Axios HTTP client and its static type. The `jest.mock('axios')` function is used to mock Axios and its deep inner fields, ensuring that all aspects of Axios behavior can be controlled and tested.
- `StateSchema`: Type representing the application's state structure, used for mocking the state during tests.


## Type Definitions
```typescript
type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;
```
- `ActionCreatorType`: A generic type that represents the function signature for creating async thunk actions. It takes three generic parameters:
  - `Return`: The return type of the async thunk.
  - `Arg`: The argument type that the thunk accepts.
-   `RejectedValue`: The type of the rejected value if the thunk fails.


## Class: `TestAsyncThunk`

### Properties
| Property     | Value                                         | Description                                                                                         |
|--------------|-----------------------------------------------|-----------------------------------------------------------------------------------------------------|
| dispatch`    | `jest.MockedFn<any>`                                      | A mocked version of the Redux `dispatch` function, allowing for tracking of dispatched actions during tests.                                                          |
| getState  | `() => StateSchema`                   | A mock function returning the application's state, allowing for testing with different state scenarios.                                                             |
| actionCreator | `ActionCreatorType<Return, Arg, RejectedValue>`  | The async thunk action creator under test.                                  |
|api | `jest.MockedFunctionDeep<AxiosStatic>`  | A deeply mocked version of the Axios HTTP client, used for simulating API calls within thunks.                                  |
| navigate | `jest.MockedFn<any>`  | A mocked function simulating navigation, useful for testing thunks that involve navigation actions.                              |

### Constructor
```typescript 
constructor(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
    state?: DeepPartial<StateSchema>,
) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn(() => state as StateSchema);
    this.api = mockedAxios;
    this.navigate = jest.fn();
}
```

- `actionCreator`: The thunk action creator that you intend to test.
- `state`: (Optional) A partial representation of the application state to initialize the mock state. If provided, `getState` will return this state during tests.

This constructor initializes the necessary mocks (`dispatch`, `getState`, `api`, and `navigate`) and associates the provided `actionCreator` with the instance.

### Method: `callThunk`
```typescript 
async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, {
        api: this.api,
        navigate: this.navigate,
    });
    return result;
}
```
- `arg`: The argument passed to the thunk action creator.
- `callThunk`: Executes the thunk action by invoking the `actionCreator` with the provided argument. 
It then calls the resulting thunk function with the mocked `dispatch`, `getState`, and dependencies (`api`, `navigate`). 
The result of the thunk execution (either fulfilled or rejected) is returned for assertion in tests.

## Usage Example
```typescript
import { TestAsyncThunk } from './path/to/TestAsyncThunk';
import { myThunkAction } from './path/to/thunks';
import { StateSchema } from '@/app/providers/StoreProvider';

const state: Partial<StateSchema> = { /* mock state */ };
const testAsyncThunk = new TestAsyncThunk(myThunkAction, state);

test('should dispatch success action when thunk succeeds', async () => {
    const result = await testAsyncThunk.callThunk(myArgument);
    expect(testAsyncThunk.dispatch).toHaveBeenCalledWith(/* expected action */);
    expect(result).toEqual(/* expected result */);
});
```
In this example:
- A `TestAsyncThunk` instance is created for the `myThunkAction` thunk, with an optional initial mock state.
- The `callThunk` method is invoked with the necessary argument, and the dispatched actions and results are asserted.
This setup provides a clear and isolated testing environment for async thunks, ensuring that all dependencies are mocked and controlled within the test.
