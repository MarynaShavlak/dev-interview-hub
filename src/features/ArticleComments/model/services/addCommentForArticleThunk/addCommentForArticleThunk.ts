import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { getArticleDetailsData } from '@/entities/Article';
import { addCommentMutation } from '../../../api/articleCommentsApi';

/**
 * Thunk to add a comment to an article.
 *
 * This thunk performs an API call to add a comment to a specific article. It first
 * retrieves the authenticated user's data and the current article's details from the state.
 * If either is missing or if the comment text is invalid, it rejects with an appropriate error message.
 * On success, the new comment is added and the article's comments are refreshed.
 *
 * @param {string} text - The text of the comment to be added.
 * @param {ThunkAPI} thunkAPI - The thunk API object provided by Redux Toolkit,
 *        containing dispatch, getState, and other utilities.
 * @returns {Promise<Comment>} Resolves with the added comment or rejects with an error message.
 */

export const addCommentForArticleThunk = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkApi) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkApi;

    try {
        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());
        if (!userData) {
            return rejectWithValue('User authentication data is missing.');
        }

        if (!article) {
            return rejectWithValue('Article details are missing.');
        }

        if (!text || text.trim() === '') {
            return rejectWithValue('Comment text cannot be empty.');
        }
        const userInfo = {
            id: userData.id,
            avatar: userData.avatar,
            email: userData.email,
            firstname: userData.firstname,
            lastname: userData.lastname,
            username: userData.username,
        };
        const commentId = v4();
        const addedComment = await dispatch(
            addCommentMutation({
                articleId: article.id,
                user: userInfo,
                text,
                id: commentId,
            }),
        ).unwrap();

        if (!addedComment) {
            return rejectWithValue('No data received from API.');
        }

        // dispatch(fetchCommentsByArticleIdThunk(article.id));

        return addedComment;
    } catch (error) {
        console.error('Error adding comment for article:', error);
        return rejectWithValue('Failed to add comment.');
    }
});
