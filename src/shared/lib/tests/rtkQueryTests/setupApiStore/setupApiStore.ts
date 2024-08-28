import {
    ActionFromReducersMapObject,
    AnyAction,
    combineReducers,
    configureStore,
    EnhancedStore,
    Middleware,
    Reducer,
    ReducersMapObject,
    StateFromReducersMapObject,
} from '@reduxjs/toolkit';

// Define the interface for the API slice
interface ApiSlice<
    State,
    ReducerPath extends string = string,
    ReducerFunction extends Reducer<State, AnyAction> = Reducer<
        State,
        AnyAction
    >,
    ResetFunction extends () => any = () => any,
> {
    reducer: ReducerFunction;
    reducerPath: ReducerPath;
    middleware: Middleware;
    util: {
        resetApiState: ResetFunction;
    };
}

interface StoreInterface {
    api: any;
    store: EnhancedStore;
}

type ApiState<A extends ApiSlice<any>> = {
    api: ReturnType<A['reducer']>;
};

// type ExtraReducersState<R extends Record<string, Reducer<any, any>>> = {
//     [K in keyof R]: ReturnType<R[K]>;
// };
type ExtraReducersState<R extends ReducersMapObject> =
    StateFromReducersMapObject<R>;

type RootState<
    A extends ApiSlice<any>,
    R extends ReducersMapObject,
> = ApiState<A> & StateFromReducersMapObject<R>;

type StoreMiddleware<S> =
    S extends EnhancedStore<any, any, infer M> ? M : never;

type StoreType<
    A extends ApiSlice<any>,
    R extends ReducersMapObject,
> = EnhancedStore<
    RootState<A, R>,
    ActionFromReducersMapObject<R> | AnyAction, // Allow for extra reducer actions and general actions
    StoreMiddleware<EnhancedStore>
>;

// Function to create the root reducer by combining API reducer with extra reducers
function createRootReducer<
    A extends ApiSlice<any>,
    R extends Record<string, Reducer<any, any>>,
>(api: A, extraReducers?: R): Reducer {
    return combineReducers({
        [api.reducerPath]: api.reducer,
        ...extraReducers,
    });
}

function configureAppStore<
    A extends ApiSlice<any>,
    R extends Record<string, Reducer<any, any>>,
>(api: A, extraReducers?: R): EnhancedStore {
    return configureStore({
        reducer: createRootReducer(api, extraReducers),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
                immutableCheck: false,
            }).concat(api.middleware),
    });
}

export function setupApiStore<
    A extends ApiSlice<any>,
    R extends Record<string, Reducer<any, any>> = Record<never, never>,
>(api: A, extraReducers?: R): StoreInterface {
    const initialStore = configureAppStore(api, extraReducers) as StoreType<
        A,
        R
    >;
    const refObj = {
        api,
        store: initialStore,
    };
    const store = configureAppStore(api, extraReducers) as StoreType<A, R>;
    refObj.store = store;

    return refObj;
}
