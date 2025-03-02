import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, deleteArticleImageThunk } from '@/entities/Article';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getBlockImageUrls } from '../../../lib/utilities/getBlockImageUrls/getBlockImageUrls';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_MESSAGES } from '../../consts/errorMessages';

export const deleteAllArticleContentImagesThunk = createAsyncThunk<
    void,
    Article,
    ThunkConfig<string>
>('article/deleteArticleImages', async (article, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!article) {
        return rejectWithValue(ERROR_MESSAGES.MISSING_ARTICLE);
    }

    const deleteImage = async (imageUrl: string, errorMessage: string) => {
        try {
            return await dispatch(deleteArticleImageThunk(imageUrl)).unwrap();
        } catch (error) {
            throw handleThunkErrorMessage(error, errorMessage);
        }
    };

    try {
        const imagesToDeleteUrls = article?.blocks
            ? getBlockImageUrls(article.blocks)
            : [];
        if (imagesToDeleteUrls.length > 0) {
            const deletePromises = imagesToDeleteUrls.map(
                (imageUrl) =>
                    deleteImage(
                        imageUrl,
                        ERROR_MESSAGES.DELETE_BLOCK_IMAGES,
                    ).catch((error) => ({ error })), // Capture errors but continue processing
            );

            await Promise.allSettled(deletePromises);
        }
        if (article?.img) {
            await deleteImage(article.img, ERROR_MESSAGES.DELETE_MAIN_IMAGE);
        }
        return undefined;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(error, ERROR_MESSAGES.DELETE_ERROR),
        );
    }
});
