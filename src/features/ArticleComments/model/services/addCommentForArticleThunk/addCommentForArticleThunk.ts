import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { addCommentMutation } from '../../../api/articleCommentsApi';
import { getArticleDataByIdQuery } from '@/entities/Article';
import { ERROR_COMMENT_MESSAGES } from '../../consts/errorCommentMessages';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';

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
    { text: string; articleId: string },
    ThunkConfig<string>
>(
    'articleComments/addCommentForArticle',
    async ({ text, articleId }, thunkApi) => {
        const { dispatch, rejectWithValue, getState } = thunkApi;

        try {
            const userData = getUserAuthData(getState());

            const article = await dispatch(
                getArticleDataByIdQuery(articleId),
            ).unwrap();
            if (!userData) {
                return rejectWithValue(
                    ERROR_COMMENT_MESSAGES.USER_AUTH_MISSING,
                );
            }

            if (!article) {
                return rejectWithValue(
                    ERROR_COMMENT_MESSAGES.ARTICLE_DETAILS_MISSING,
                );
            }

            if (!text || text.trim() === '') {
                return rejectWithValue(
                    ERROR_COMMENT_MESSAGES.COMMENT_TEXT_REQUIRED,
                );
            }
            const { id, avatar, email, firstname, lastname, username } =
                userData;
            const userInfo = {
                id,
                avatar,
                email,
                firstname,
                lastname,
                username,
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

            return addedComment;
        } catch (error) {
            return rejectWithValue(
                handleThunkErrorMessage(
                    error,
                    ERROR_COMMENT_MESSAGES.COMMENT_ADD_API_FAIL,
                ),
            );
        }
    },
);
