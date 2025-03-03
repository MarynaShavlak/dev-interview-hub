import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    Article,
    deleteArticleImageThunk,
    ERROR_ARTICLE_MESSAGES,
} from '@/entities/Article';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getBlockImageUrls } from '../../../lib/utilities/getBlockImageUrls/getBlockImageUrls';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';

export const deleteAllArticleContentImagesThunk = createAsyncThunk<
    void,
    Article,
    ThunkConfig<string>
>('article/deleteArticleImages', async (article, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!article.id) {
        return rejectWithValue(
            ERROR_ARTICLE_MESSAGES.ARTICLE_NOT_FOUND(article.id),
        );
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
            const deletePromises = imagesToDeleteUrls.map((imageUrl) =>
                deleteImage(
                    imageUrl,
                    ERROR_ARTICLE_MESSAGES.DELETE_BLOCK_IMAGES,
                ).catch((error) => ({ error })),
            );

            await Promise.allSettled(deletePromises);
        }
        if (article?.img) {
            await deleteImage(
                article.img,
                ERROR_ARTICLE_MESSAGES.DELETE_MAIN_IMAGE,
            );
        }
        return undefined;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(error, ERROR_ARTICLE_MESSAGES.DELETE_ERROR),
        );
    }
});
