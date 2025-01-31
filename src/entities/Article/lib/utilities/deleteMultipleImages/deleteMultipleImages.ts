import { deleteArticleImageThunk } from '../../../model/services/deleteArticleImageThunk/deleteArticleImageThunk';
import { AppDispatch } from '@/app/providers/StoreProvider';

export const deleteMultipleImages = async (
    imageUrls: string[],
    dispatch: AppDispatch,
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
