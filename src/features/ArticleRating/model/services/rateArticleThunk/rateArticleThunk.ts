import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { rateArticleMutation } from '../../../api/articleRatingApi';
import { ERROR_RATING_MESSAGES } from '../../consts/errorRatingMessages';
import { ArticleRatingType } from '../../types/articleRatingType';
import { checkExistingRating } from '../../../lib/utilities/checkExistingRating/checkExistingRating';

export const rateArticleThunk = createAsyncThunk<
    ArticleRatingType | null,
    { rate: number; articleId: string; feedback?: string },
    ThunkConfig<string>
>(
    'articleRatings/rateArticle',
    async ({ rate, articleId, feedback }, thunkApi) => {
        const { dispatch, rejectWithValue, getState } = thunkApi;

        try {
            const userData = getUserAuthData(getState());

            if (!userData) {
                return rejectWithValue(ERROR_RATING_MESSAGES.USER_AUTH_MISSING);
            }

            const { id, avatar, email, firstname, lastname, username } =
                userData;

            const ratingExists = await checkExistingRating(
                articleId,
                userData.id,
            );

            if (ratingExists) {
                return null;
            }
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
