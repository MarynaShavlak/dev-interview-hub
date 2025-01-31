import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    deleteArticleMutation,
    getArticleDataByIdQuery,
} from '../../../api/articleApi';
import { deleteArticleImageThunk } from '../../../model/services/deleteArticleImageThunk/deleteArticleImageThunk';
import { getBlockImageUrls } from '../../../lib/utilities/getBlockImageUrls/getBlockImageUrls';
import { handleThunkError } from '../../../lib/utilities/handleThunkError/handleThunkError';
import { deleteMultipleImages } from '../../../lib/utilities/deleteMultipleImages/deleteMultipleImages';
import { deleteCommentsByArticleId } from '@/features/ArticleComments';

export const deleteArticleThunk = createAsyncThunk<
    string,
    string,
    ThunkConfig<string>
>('article/deleteArticle', async (articleId, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!articleId) {
        return rejectWithValue('Article ID is required.');
    }

    try {
        const article = await dispatch(
            getArticleDataByIdQuery(articleId),
        ).unwrap();
        console.log(article);

        const imagesToDelete = article?.blocks
            ? getBlockImageUrls(article.blocks)
            : [];

        if (imagesToDelete.length > 0) {
            try {
                await deleteMultipleImages(imagesToDelete, dispatch);
            } catch (imageError) {
                return rejectWithValue(
                    handleThunkError(
                        imageError,
                        'Failed to delete article block images.',
                    ),
                );
            }
        }
        if (article?.img) {
            try {
                await dispatch(deleteArticleImageThunk(article.img)).unwrap();
            } catch (imageError) {
                return rejectWithValue(
                    handleThunkError(
                        imageError,
                        'Failed to delete main article image.',
                    ),
                );
            }
        }
        const deletedArticleId = await dispatch(
            deleteArticleMutation(articleId),
        ).unwrap();
        if (deletedArticleId) {
            try {
                await dispatch(deleteCommentsByArticleId(articleId));
            } catch (error) {
                return rejectWithValue(
                    handleThunkError(error, `Failed to delete comments`),
                );
            }
        }

        return deletedArticleId;
    } catch (error) {
        return rejectWithValue(
            handleThunkError(
                error,
                `Failed to delete article with ID "${articleId}".`,
            ),
        );
    }
});
