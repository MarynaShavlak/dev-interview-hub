import {
    AnyAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CombinedState } from 'redux';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
import { UIScrollSchema } from '@/widgets/Page';
import { ArticleDetailsSchema } from '@/entities/Article';
import { UserSchema } from '@/entities/User';

import { LoginSchema, SignupSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/features/EditableProfileCard';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { firestoreApi, rtkApi } from '@/shared/api/rtkApi';
import { AddCommentFormSchema } from '@/entities/Comment';
import { ArticleCommentsSchema } from '@/features/ArticleComments';

export interface StateSchema {
    user: UserSchema;
    scroll: UIScrollSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    [firestoreApi.reducerPath]: ReturnType<typeof firestoreApi.reducer>;
    // Async reducers
    loginForm?: LoginSchema;
    signupForm?: SignupSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
    // articleDetailsPage?: ArticleDetailsPageSchema;
    articleComments?: ArticleCommentsSchema;
}

export type StateSchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    // true - mounted, false - not mounted( or unmounted)
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    firebaseApp: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
    firebaseStorage: FirebaseStorage;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
