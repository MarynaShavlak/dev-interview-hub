import { useCallback, useState } from 'react';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import {
    ArticleImageBlock,
    ArticleSection,
    uploadArticleImageThunk,
} from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface UseImageBlockOperationsProps {
    blockId: string;
    title: string;
    selectedImage: File | null;
    addBlockInArticle: (block: ArticleImageBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleImageBlock) => void;
}

export const useImageBlockOperations = ({
    blockId,
    title,

    addBlockInArticle,
    deleteBlockFromArticle,
    onEditBlock,
    selectedImage,
}: UseImageBlockOperationsProps) => {
    const {
        isVisible: isEditModeActive,
        toggleVisibility: toggleEditMode,
        hide: exitEditMode,
        show: enterEditMode,
    } = useToggleVisibility();

    const dispatch = useAppDispatch();

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

    const saveImageBlock = useCallback(async () => {
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
    }, [getArticleImageUrl, blockId, title, onEditBlock, addBlockInArticle]);

    const deleteImageBlock = useCallback(() => {
        if (deleteBlockFromArticle) {
            deleteBlockFromArticle(blockId);
        }
    }, [deleteBlockFromArticle, blockId]);

    const resetUploadError = useCallback(() => {
        if (uploadError) {
            setUploadError(null);
        }
    }, [uploadError]);

    // const { saveImageBlock, deleteImageBlock, uploadError, resetUploadError } =
    //     useImageBlockActions({
    //         blockId,
    //         title,
    //         src,
    //         addBlockInArticle,
    //         onEditBlock,
    //         deleteBlockFromArticle,
    //         selectedImage,
    //     });

    const handleSaveImageBlock = useCallback(async () => {
        await saveImageBlock();
        exitEditMode();
    }, [exitEditMode, saveImageBlock]);

    return {
        isEditModeActive,
        toggleEditMode,
        enterEditMode,
        exitEditMode,
        handleSaveImageBlock,
        handleDeleteImageBlock: deleteImageBlock,
        uploadError,
        resetUploadError,
    };
};
