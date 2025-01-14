import { useCallback } from 'react';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { useImageBlockActions } from '../useImageBlockActions/useImageBlockActions';
import { ArticleImageBlock } from '@/entities/Article';

interface UseImageBlockOperationsProps {
    blockId: string;
    title: string;
    src: string;
    selectedImage: File | null;
    addBlockInArticle: (block: ArticleImageBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleImageBlock) => void;
}

export const useImageBlockOperations = ({
    blockId,
    title,
    src,
    addBlockInArticle,
    deleteBlockFromArticle,
    onEditBlock,
    selectedImage,
}: UseImageBlockOperationsProps) => {
    const {
        isVisible: isEditModeActive,
        toggleVisibility: toggleEditMode,
        hideElement: deactivateEditMode,
        showElement: activateEditMode,
    } = useToggleVisibility();

    const { saveImageBlock, deleteImageBlock, uploadError, resetUploadError } =
        useImageBlockActions({
            blockId,
            title,
            src,
            addBlockInArticle,
            onEditBlock,
            deleteBlockFromArticle,
            selectedImage,
        });

    const handleSaveImageBlock = useCallback(async () => {
        await saveImageBlock();
        deactivateEditMode();
    }, [deactivateEditMode, saveImageBlock]);

    return {
        isEditModeActive,
        toggleEditMode,
        activateEditMode,
        deactivateEditMode,
        handleSaveImageBlock,
        handleDeleteImageBlock: deleteImageBlock,
        uploadError,
        resetUploadError,
    };
};
