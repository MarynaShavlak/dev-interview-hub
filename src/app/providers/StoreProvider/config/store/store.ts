import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState, Reducer } from 'redux';
import { scrollReducer } from '@/widgets/Page';
import { userReducer } from '@/entities/User';
import { $api } from '@/shared/api/api';
import { firestoreApi, rtkApi } from '@/shared/api/rtkApi';
import { StateSchema, ThunkExtraArg } from './StateSchema/StateSchema';
import { createReducerManager } from './reducerManager/reducerManager';
import {
    auth,
    firebaseApp,
    firestore,
    firebaseStorage,
} from '../../../../../../json-server/firebase';

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        scroll: scrollReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
        [firestoreApi.reducerPath]: firestoreApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
        firebaseApp,
        auth,
        firestore,
        firebaseStorage,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
                serializableCheck: {
                    ignoredActions: [
                        'profile/setUploadedProfilePhoto',
                        'createArticle/setUploadedArticleImage',
                    ],
                    ignoredPaths: [
                        'profile.uploadedProfilePhoto',
                        'createArticle.uploadedArticleImage',
                    ],
                    ignoredActionPaths: ['meta.arg', 'meta.baseQueryMeta'],
                },
            })
                .concat(rtkApi.middleware)
                .concat(firestoreApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
