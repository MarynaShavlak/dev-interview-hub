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

/**
 * Represents an API slice within the Redux store.
 */
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

/**
 * Represents the structure of the object returned by `setupApiStore`.
 */
interface StoreInterface {
    api: any;
    store: EnhancedStore;
}

/**
 * Extracts the state type from an `ApiSlice`.
 */
type ApiState<A extends ApiSlice<any>> = {
    api: ReturnType<A['reducer']>;
};

/**
 * Represents the combined state managed by the API slice and additional reducers.
 */
type RootState<
    A extends ApiSlice<any>,
    R extends ReducersMapObject,
> = ApiState<A> & StateFromReducersMapObject<R>;

/**
 * Extracts the middleware type from an `EnhancedStore`.
 */
type StoreMiddleware<S> =
    S extends EnhancedStore<any, any, infer M> ? M : never;

/**
 * Represents the enhanced Redux store with API slice and additional reducers.
 */
type StoreType<
    A extends ApiSlice<any>,
    R extends ReducersMapObject,
> = EnhancedStore<
    RootState<A, R>,
    ActionFromReducersMapObject<R> | AnyAction,
    StoreMiddleware<EnhancedStore>
>;

function createRootReducer<
    A extends ApiSlice<any>,
    R extends ReducersMapObject,
>(api: A, extraReducers?: R): Reducer {
    return combineReducers({
        [api.reducerPath]: api.reducer,
        ...extraReducers,
    });
}

function configureAppStore<
    A extends ApiSlice<any>,
    R extends ReducersMapObject,
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
    R extends ReducersMapObject = Record<never, never>,
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
