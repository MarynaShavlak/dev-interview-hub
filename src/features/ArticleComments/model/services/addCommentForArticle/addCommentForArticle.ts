import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { getArticleDetailsData } from '@/entities/Article';
import { fetchCommentsByArticleIdThunk } from '../fetchCommentsByArticleIdThunk/fetchCommentsByArticleIdThunk';

/**
 * Thunk to add a comment to an article.
 *
 * This thunk performs an API call to post a new comment associated with a specific article.
 * It retrieves the current user's data and the details of the article from the state. It
 * handles scenarios where user data, article details, or the comment text is missing.
 * If the API call is successful, it triggers a refetch of the comments for the article.
 * In case of failure or invalid data, it handles errors appropriately.
 *
 * @param {string} text - The text content of the comment to be added.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
 *        dispatch, getState, extra, and more.
 * @returns {Promise<Comment>} A promise that resolves to the newly added comment or
 *        rejects with an error message.
 */

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkApi) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkApi;

    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
        return rejectWithValue('Required data is missing.');
    }

    try {
        const response = await extra.api.post<Comment>('/comments', {
            articleId: article.id,
            userId: userData.id,
            text,
        });

        if (!response.data) {
            return rejectWithValue('No data received from API.');
        }

        dispatch(fetchCommentsByArticleIdThunk(article.id));

        return response.data;
    } catch (error) {
        console.error('Error adding comment for article:', error);
        return rejectWithValue('Failed to add comment.');
    }
});
