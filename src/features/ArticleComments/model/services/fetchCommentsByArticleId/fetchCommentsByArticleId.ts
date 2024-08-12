import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';

/**
 * Thunk to fetch comments associated with a specific article ID.
 *
 * This thunk performs an API call to retrieve comments related to the article identified
 * by the given article ID. It handles scenarios where the article ID is missing or the
 * API response is invalid. If the API call fails or returns an error, it handles the error
 * appropriately.
 *
 * @param {string | undefined} articleId - The ID of the article to fetch comments for.
 *        If undefined, the thunk will reject with an error message.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
 *        dispatch, getState, extra, and more.
 * @returns {Promise<Comment[]>} A promise that resolves to an array of comments or
 *        rejects with an error message.
 */

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!articleId) {
        return rejectWithValue('Article ID is required.');
    }

    try {
        const response = await extra.api.get<Comment[]>('/comments', {
            params: {
                articleId,
                _expand: 'user',
            },
        });

        if (!response.data) {
            return rejectWithValue('No comments found.');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching comments by article ID:', error);
        return rejectWithValue('Failed to fetch comments.');
    }
});
