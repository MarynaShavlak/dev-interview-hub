import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    deleteArticleMutation,
    getArticleDataByIdQuery,
} from '../../../api/articleApi';
import { deleteArticleImageThunk } from '../../../model/services/deleteArticleImageThunk/deleteArticleImageThunk';
import { getBlockImageUrls } from '../../../lib/utilities/getBlockImageUrls/getBlockImageUrls';

const deleteMultipleImages = async (
    imageUrls: string[],
    dispatch: any,
): Promise<void> => {
    const deletePromises = imageUrls.map(async (imageUrl) => {
        try {
            await dispatch(deleteArticleImageThunk(imageUrl)).unwrap();
        } catch (error) {
            console.error(`Failed to delete image: ${imageUrl}`, error);

            throw error;
        }
    });

    await Promise.all(deletePromises);
};

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
                console.error('Failed to delete some images:', imageError);
                return rejectWithValue('Failed to delete article images.');
            }
        }
        if (article?.img) {
            try {
                await dispatch(deleteArticleImageThunk(article.img)).unwrap();
            } catch (imageError) {
                console.error('Failed to delete article image:', imageError);

                return rejectWithValue('Failed to delete article image.');
            }
        }
        const deletedArticleId = await dispatch(
            deleteArticleMutation(articleId),
        ).unwrap();
        console.log(`Article with ID "${articleId}" has been deleted.`);
        return deletedArticleId;
    } catch (error) {
        console.error(
            `Failed to delete article with ID "${articleId}":`,
            error,
        );
        return rejectWithValue('Failed to delete article.');
    }
});
