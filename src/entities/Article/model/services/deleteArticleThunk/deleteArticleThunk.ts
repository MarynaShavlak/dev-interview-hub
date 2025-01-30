import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    deleteArticleMutation,
    getArticleDataByIdQuery,
} from '../../../api/articleApi';
import { deleteArticleImageThunk } from '../../../model/services/deleteArticleImageThunk/deleteArticleImageThunk';

// Helper function to extract image URLs from article blocks
const getBlockImageUrls = (blocks: any[]): string[] => {
    return blocks.reduce((urls: string[], block: any) => {
        // Check if block has src property and it's a string (image URL)
        if (block.src && typeof block.src === 'string') {
            urls.push(block.src);
        }
        return urls;
    }, []);
};

// Helper function to delete multiple images
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
        const imagesToDelete: string[] = [];
        if (article?.blocks) {
            const blockImages = getBlockImageUrls(article.blocks);
            imagesToDelete.push(...blockImages);
        }

        if (imagesToDelete.length > 0) {
            try {
                await deleteMultipleImages(imagesToDelete, dispatch);
                console.log(
                    `Successfully deleted ${imagesToDelete.length} images`,
                );
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
