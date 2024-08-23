import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';
import { StateSchema } from '@/app/providers/StoreProvider';

/**
 * Utility class for testing Redux async thunks.
 *
 * The `TestAsyncThunk` class simplifies the testing of async thunk actions by providing
 * a controlled environment where you can mock dependencies such as the Redux store state,
 * dispatch function, and external API calls via Axios.
 */

// Type definition for an action creator function that returns an async thunk action
type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>; // Mocked dispatch function to track dispatched actions

    getState: () => StateSchema; // Mocked function to retrieve the state

    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>; // The async thunk action creator being tested

    api: jest.MockedFunctionDeep<AxiosStatic>; // Deeply mocked Axios instance for API calls

    navigate: jest.MockedFn<any>; // Mocked function for navigation actions

    /**
     * Constructs a new instance of `TestAsyncThunk`.
     *
     * @param actionCreator - The async thunk action creator to be tested.
     * @param state - (Optional) A partial state object to be returned by the mock `getState` function.
     */

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
    /**
     * Executes the thunk action.
     *
     * This method calls the thunk action with the provided argument, dispatch function,
     * state getter, and mocked dependencies. It returns the result of the thunk action,
     * allowing you to make assertions in your tests.
     *
     * @param arg - The argument to pass to the thunk action creator.
     * @returns The result of the thunk action execution.
     */

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg);
        const result = await action(this.dispatch, this.getState, {
            api: this.api,
            navigate: this.navigate,
        });
        return result;
    }
}
