import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, deleteArticleImageThunk } from '@/entities/Article';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getBlockImageUrls } from '../../../lib/utilities/getBlockImageUrls/getBlockImageUrls';
import { handleThunkError } from '../../../lib/utilities/handleThunkError/handleThunkError';
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

    try {
        const imagesToDeleteUrls = article?.blocks
            ? getBlockImageUrls(article.blocks)
            : [];
        if (imagesToDeleteUrls.length > 0) {
            try {
                const deletePromises = imagesToDeleteUrls.map(
                    async (imageUrl) => {
                        try {
                            return await dispatch(
                                deleteArticleImageThunk(imageUrl),
                            ).unwrap();
                        } catch (error) {
                            return rejectWithValue(
                                handleThunkError(
                                    error,
                                    ERROR_MESSAGES.DELETE_BLOCK_IMAGES,
                                ),
                            );
                        }
                    },
                );

                await Promise.allSettled(deletePromises);
            } catch (error) {
                return rejectWithValue(
                    handleThunkError(error, ERROR_MESSAGES.DELETE_BLOCK_IMAGES),
                );
            }
        }

        if (article?.img) {
            try {
                await dispatch(deleteArticleImageThunk(article.img)).unwrap();
            } catch (error) {
                return rejectWithValue(
                    handleThunkError(error, ERROR_MESSAGES.DELETE_MAIN_IMAGE),
                );
            }
        }
    } catch (error) {
        return rejectWithValue(
            handleThunkError(error, ERROR_MESSAGES.DELETE_ERROR),
        );
    }
});
