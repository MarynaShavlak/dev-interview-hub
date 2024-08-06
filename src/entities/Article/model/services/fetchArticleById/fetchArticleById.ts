import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';

/**
 * Thunk to fetch an article by its ID from the API.
 *
 * This thunk performs an API call to retrieve the article details using the provided
 * article ID. It handles scenarios where the article ID is undefined or the API response
 * is invalid. If the API call fails or returns an error, it handles the error appropriately.
 *
 * @param {string | undefined} articleId - The ID of the article to fetch. If undefined,
 *        the thunk will reject with an error.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
 *        dispatch, getState, extra, and more.
 * @returns {Promise<Article>} The article data retrieved from the API or an error message.
 */

export const fetchArticleById = createAsyncThunk<
    Article,
    string | undefined,
    ThunkConfig<string>
>('articleDetails/fetchArticleById', async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        if (!articleId) {
            throw new Error('Article ID is required.');
        }

        const response = await extra.api.get<Article>(
            `/articles/${articleId}`,
            {
                params: {
                    _expand: 'user',
                },
            },
        );

        if (!response.data) {
            return rejectWithValue('Article not found.');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching article by ID:', error);
        return rejectWithValue('Failed to fetch article.');
    }
});
