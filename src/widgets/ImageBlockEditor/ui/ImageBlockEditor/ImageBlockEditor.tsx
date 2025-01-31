import React, { useMemo } from 'react';
import { ArticleImageBlock, ArticleSection } from '@/entities/Article';

import { ImageUploadError } from '../ImageUploadError/ImageUploadError';
import { useImageBlockState } from '../../lib/hooks/useImageBlockState/useImageBlockState';

import { useImageBlockOperations } from '../../lib/hooks/useImageBlockOperations/useImageBlockOperations';
import { ImageBlockDisplay } from '../ImageBlockDisplay/ImageBlockDisplay';

interface ImageBlockEditorProps {
    block: ArticleImageBlock;
    addBlockInArticle: (block: ArticleImageBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleImageBlock) => void;
}

export const ImageBlockEditor = (props: ImageBlockEditorProps) => {
    const { block, addBlockInArticle, deleteBlockFromArticle, onEditBlock } =
        props;

    const initialTitle = block.title || '';
    const initialAvatar = block.src || '';
    const isEditArticlePage = Boolean(initialTitle && initialAvatar);
    const {
        title,
        handleTitleChange,
        isEmptyContent: hasNoContent,
        preview,
        fileTypeError,
        handleImageChange,
        resetImage,
        selectedImage,
    } = useImageBlockState({
        initialTitle,
        initialAvatar,
    });

    const {
        isEditModeActive,
        toggleEditMode,
        enterEditMode,
        handleDeleteImageBlock,
        handleSaveImageBlock,
        uploadError,
        resetUploadError,
    } = useImageBlockOperations({
        blockId: block.id,
        title,

        addBlockInArticle,
        deleteBlockFromArticle,
        onEditBlock,
        selectedImage,

        initialAvatar,
    });

    const currentBlockData: ArticleImageBlock = useMemo(
        () =>
            isEditArticlePage
                ? block
                : {
                      id: block.id,
                      type: ArticleSection.IMAGE,
                      src: initialAvatar,
                      title,
                  },
        [block, initialAvatar, isEditArticlePage, title],
    );
    const hasNoValidImage = hasNoContent || !!fileTypeError;

    const formProps = {
        title,
        handleTitleChange,
        onSave: handleSaveImageBlock,
        preview,
        imageTypeError: fileTypeError,
        handleImageChange,
        resetImage,
        hasNoValidImage,
    };

    const viewerProps = {
        editBlock: isEditArticlePage ? enterEditMode : toggleEditMode,
        block: currentBlockData,
    };

    if (!uploadError) {
        return (
            <ImageBlockDisplay
                isEditArticlePage={isEditArticlePage}
                isEditing={isEditModeActive}
                formProps={formProps}
                onDelete={handleDeleteImageBlock}
                viewerProps={viewerProps}
            />
        );
    }
    return <ImageUploadError onRetry={resetUploadError} />;
};
