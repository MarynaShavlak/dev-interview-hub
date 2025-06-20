import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { addCommentFormReducer } from '@/entities/Comment/testing';
import { loginReducer, signupReducer } from '@/features/AuthUser/testing';
import { profileReducer } from '@/features/EditableProfileCard/testing';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlesPageReducer } from '@/pages/ArticlesPage/testing';
import { createArticleReducer } from '@/pages/ArticleEditorPage/testing';
import { addQuestionFormReducer } from '@/entities/Question/testing';
import { addLinkFormReducer } from '@/entities/Link/testing';
import { createHRInterviewQAReducer } from '@/pages/HRInterviewAnswerEditorPage/testing';
import { addVocabularyFormReducer } from '@/entities/Vocabulary/testing';

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
    signupForm: signupReducer,
    profile: profileReducer,
    // articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    addQuestionForm: addQuestionFormReducer,
    addLinkForm: addLinkFormReducer,
    addVocabularyForm: addVocabularyFormReducer,
    articlesPage: articlesPageReducer,
    createArticle: createArticleReducer,
    createHRInterviewQA: createHRInterviewQAReducer,
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
