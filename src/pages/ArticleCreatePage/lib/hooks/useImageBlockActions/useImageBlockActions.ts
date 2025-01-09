import { useCallback, useState } from 'react';
import { ArticleImageBlock, ArticleSection } from '@/entities/Article';
import { useArticleEditor } from '../useArticleEditor/useArticleEditor';
import { uploadArticleImageThunk } from '../../../model/services/uploadArticleImageThunk/uploadImageThunk';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface UseCodeBlockActionsParams {
    blockId: string;
    src: string;
    title: string;
    addBlockInArticle: (block: ArticleImageBlock) => void;
    onEditBlock?: (block: ArticleImageBlock) => void;
    deleteBlockFromArticle?: (id: string) => void;
    selectedImage: File | null;
}

export const useImageBlockActions = ({
    blockId,

    title,
    addBlockInArticle,
    onEditBlock,
    deleteBlockFromArticle,
    selectedImage,
}: UseCodeBlockActionsParams) => {
    const dispatch = useAppDispatch();
    const { onChangeBlocks, onDeleteBlock } = useArticleEditor();
    const [uploadError, setUploadError] = useState<string | null>(null);

    const getArticleImageUrl = useCallback(async () => {
        setUploadError(null);
        if (selectedImage) {
            try {
                const url = await dispatch(
                    uploadArticleImageThunk(selectedImage),
                ).unwrap();

                return url;
            } catch (error) {
                const errorMessage =
                    error instanceof Error ? error.message : 'Upload failed.';
                setUploadError(errorMessage);
                return null;
            }
        }
        return '';
    }, [dispatch, selectedImage]);

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

    return {
        saveImageBlock: saveBlock,
        deleteImageBlock: deleteBlock,
        uploadError,
    };
};
