import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

/**
 * Thunk to fetch a list of article recommendations.
 *
 * This thunk performs an API call to retrieve a list of recommended articles. It requests a
 * limited number of articles (3 in this case) from the API. The thunk handles scenarios where
 * the API response is invalid or an error occurs during the request. If the API call fails or
 * returns an error, it handles the error appropriately.
 *
 * @param {void} _ - This thunk does not require any parameters.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
 *        dispatch, getState, extra, and more.
 * @returns {Promise<Article[]>} A promise that resolves to an array of recommended articles
 *        or rejects with an error message.
 */

export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>('articleDetailsPage/fetchArticleRecommendations', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _limit: 3,
            },
        });

        if (!response.data) {
            return rejectWithValue('No article recommendations found.');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching article recommendations:', error);
        return rejectWithValue('Failed to fetch article recommendations.');
    }
});
