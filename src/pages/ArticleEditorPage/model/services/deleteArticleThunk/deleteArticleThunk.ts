import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, deleteArticleMutation } from '@/entities/Article';

/**
 * Thunk to handle deleting an article.
 * - Ensures the article ID is provided.
 * - Dispatches actions based on success or failure.
 */
export const deleteArticleThunk = createAsyncThunk<
    string,
    Article,
    ThunkConfig<string>
>('article/deleteArticle', async (article, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    if (!article.id) {
        return rejectWithValue('Article ID is required.');
    }

    try {
        const deletedArticleId = await dispatch(
            deleteArticleMutation(article),
        ).unwrap();
        console.log(`Article with ID "${article.id}" has been deleted.`);
        return deletedArticleId;
    } catch (error) {
        console.error(
            `Failed to delete article with ID "${article.id}":`,
            error,
        );
        return rejectWithValue('Failed to delete article.');
    }
});
