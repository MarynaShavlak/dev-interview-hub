import { useCallback, useState } from 'react';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import {
    ArticleImageBlock,
    deleteArticleImageThunk,
    uploadArticleImageThunk,
} from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SectionType } from '@/shared/types/sectionTypes';

interface UseImageBlockOperationsProps {
    blockId: string;
    title: string;
    selectedImage: File | null;
    addBlockInArticle: (block: ArticleImageBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleImageBlock) => void;
    initialAvatar: string;
}

export const useImageBlockOperations = ({
    blockId,
    title,
    addBlockInArticle,
    deleteBlockFromArticle,
    onEditBlock,
    selectedImage,
    initialAvatar,
}: UseImageBlockOperationsProps) => {
    const {
        isVisible: isEditModeActive,
        toggleVisibility: toggleEditMode,
        hide: exitEditMode,
        show: enterEditMode,
    } = useToggleVisibility();

    const dispatch = useAppDispatch();

    const [uploadError, setUploadError] = useState<string | null>(null);

    const deleteFromStorage = useCallback(async () => {
        if (initialAvatar) {
            await dispatch(deleteArticleImageThunk(initialAvatar)).unwrap();
        }
    }, [dispatch, initialAvatar]);

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
            type: SectionType.IMAGE,
            src: imageUrl || '',
            title,
        };

        if (onEditBlock) {
            onEditBlock(updatedBlock);
        } else {
            addBlockInArticle(updatedBlock);
        }
    }, [getArticleImageUrl, blockId, title, onEditBlock, addBlockInArticle]);

    const deleteImageBlock = useCallback(async () => {
        if (deleteBlockFromArticle) {
            deleteBlockFromArticle(blockId);
        }
        await deleteFromStorage();
    }, [deleteBlockFromArticle, deleteFromStorage, blockId]);

    const resetUploadError = useCallback(() => {
        if (uploadError) {
            setUploadError(null);
        }
    }, [uploadError]);

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
