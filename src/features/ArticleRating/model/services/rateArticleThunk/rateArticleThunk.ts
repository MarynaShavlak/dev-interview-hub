import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage } from '@/shared/lib/firestore/handleThunkErrorMessage/handleThunkErrorMessage';
import { rateArticleMutation } from '../../../api/articleRatingApi';
import { ERROR_RATING_MESSAGES } from '../../consts/errorRatingMessages';
import { ArticleRatingType } from '../../types/articleRatingType';

export const rateArticleThunk = createAsyncThunk<
    ArticleRatingType,
    { rate: number; articleId: string; feedback?: string },
    ThunkConfig<string>
>(
    'articleRatings/rateArticle',
    async ({ rate, articleId, feedback }, thunkApi) => {
        const { dispatch, rejectWithValue, getState } = thunkApi;

        try {
            const userData = getUserAuthData(getState());
            // const article = await dispatch(
            //     getArticleDataByIdQuery(articleId),
            // ).unwrap();
            if (!userData) {
                return rejectWithValue(ERROR_RATING_MESSAGES.USER_AUTH_MISSING);
            }

            // if (!article) {
            //     return rejectWithValue(ERROR_MESSAGES.ARTICLE_DETAILS_MISSING);
            // }

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

            const addedArticleRating = await dispatch(
                rateArticleMutation({
                    articleId,
                    user: userInfo,
                    rate,
                    id: v4(),
                    feedback: feedback || null,
                }),
            ).unwrap();

            return addedArticleRating;
        } catch (error) {
            return rejectWithValue(
                handleThunkErrorMessage(
                    error,
                    ERROR_RATING_MESSAGES.ADD_RATING_FAIL,
                ),
            );
        }
    },
);
