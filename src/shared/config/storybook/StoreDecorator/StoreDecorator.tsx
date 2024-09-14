import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { addCommentFormReducer } from '@/entities/Comment/testing';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { profileReducer } from '@/features/editableProfileCard/testing';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleCommentsReducer } from '@/features/ArticleComments/testing';
import { articlesPageReducer } from '@/pages/ArticlesPage/testing';

/**
 * The `StoreDecorator` function is a Storybook decorator that wraps components in a Redux store
 * with customizable state and reducers. This allows Storybook to simulate different Redux states
 * and handle dynamic reducers for testing.
 *
 * It combines default asynchronous reducers (for handling various feature states) with any
 * additional reducers passed as arguments, giving full control over the Redux environment for stories.
 *
 * @param state - A partial representation of the Redux state (`StateSchema`), allowing you to define
 *                the initial state for the Storybook component being rendered.
 * @param asyncReducers - Optional additional reducers (`ReducersList`) that can be passed in to
 *                        augment or override the default asynchronous reducers.
 *
 * @returns A function that takes a `StoryComponent` and wraps it in a `StoreProvider` component,
 *          initializing the store with the provided state and reducers, so the component can be
 *          tested with a fully functional Redux setup.
 */

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleComments: articleCommentsReducer,
    articlesPage: articlesPageReducer,
};

export const StoreDecorator =
    (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
    (StoryComponent: Story) => (
        <StoreProvider
            initialState={state}
            asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
        >
            <StoryComponent />
        </StoreProvider>
    );
