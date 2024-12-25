import { useCallback } from 'react';
import { ArticleImageBlock, ArticleSection } from '@/entities/Article';
import { useCreateArticle } from '../useCreateArticle/useCreateArticle';
import { useUploadedArticleImage } from '../../../model/selectors/getCreateArticleSelectors';
import { uploadImageThunk } from '../../../model/services/uploadImageThunk/uploadImageThunk';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface UseCodeBlockActionsParams {
    blockId: string;
    src: string;
    title: string;
    addBlockInArticle: (block: ArticleImageBlock) => void;
    onEditBlock?: (block: ArticleImageBlock) => void;
    deleteBlockFromArticle?: (id: string) => void;
}

export const useImageBlockActions = ({
    blockId,
    src,
    title,
    addBlockInArticle,
    onEditBlock,
    deleteBlockFromArticle,
}: UseCodeBlockActionsParams) => {
    const dispatch = useAppDispatch();
    const { formData, onChangeBlocks, onDeleteBlock } = useCreateArticle();
    const uploadedArticleImage = useUploadedArticleImage();
    console.log('uploadedArticleImage', uploadedArticleImage);

    const getArticleImageUrl = useCallback(async () => {
        // console.log('profileData', profileData);
        // console.log('formData', formData);
        console.log('uploadedArticleImage', uploadedArticleImage);
        if (uploadedArticleImage) {
            const url = await dispatch(
                uploadImageThunk(uploadedArticleImage),
            ).unwrap();
            return url;
            // onChangeAvatar(url);
        }
        if (uploadedArticleImage == null) {
            // onChangeAvatar('');
            return '';
        }
    }, [dispatch, uploadedArticleImage]);

    const saveBlock = useCallback(async () => {
        const imageUrl = await getArticleImageUrl();
        const updatedBlock: ArticleImageBlock = {
            id: blockId,
            type: ArticleSection.IMAGE,
            src: imageUrl || '',
            title,
        };

        if (onEditBlock) {
            onEditBlock(updatedBlock);
        } else {
            addBlockInArticle(updatedBlock);
        }
        onChangeBlocks(updatedBlock);
    }, [
        getArticleImageUrl,
        blockId,
        title,
        onEditBlock,
        onChangeBlocks,
        addBlockInArticle,
    ]);

    const deleteBlock = useCallback(() => {
        if (deleteBlockFromArticle) {
            deleteBlockFromArticle(blockId);
            onDeleteBlock(blockId);
        }
    }, [deleteBlockFromArticle, blockId, onDeleteBlock]);

    return { saveImageBlock: saveBlock, deleteImageBlock: deleteBlock };
};
