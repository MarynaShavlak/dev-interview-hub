import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from './ImageBlockEditor.module.scss';
import {
    ArticleImageBlock,
    ArticleImageBlockComponent,
    ArticleSection,
} from '@/entities/Article';
import { useBlockTitle } from '../../lib/hooks/useBlockTitle/useBlockTitle';
import { Input } from '@/shared/ui/redesigned/Input';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';

import { useImageBlockActions } from '../../lib/hooks/useImageBlockActions/useImageBlockActions';
import { BlockActionButtonList } from '../BlockActionButtonList/BlockActionButtonList';
import { ImagePreview } from './ImagePreview/ImagePreview';
import { BlockPreview } from '../BlockPreview/BlockPreview';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';

interface ImageBlockEditorProps {
    // avatar: string;
    // blockId: string;
    // onFileUpload: (file: File | null) => void;
    block: ArticleImageBlock;
    addBlockInArticle: (block: ArticleImageBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleImageBlock) => void;
}

export const ImageBlockEditor = (props: ImageBlockEditorProps) => {
    const {
        // avatar,
        // blockId,
        block,
        addBlockInArticle,
        deleteBlockFromArticle,

        onEditBlock,
        // onFileUpload,
    } = props;

    const { t } = useTranslation('profile');
    const errorMessage = t('Некоректний тип файлу');
    const { title, handleTitleChange, validConfig } = useBlockTitle();
    const { isVisible: isBlockSaved, toggleVisibility: toggleBlockSaveState } =
        useToggleVisibility();

    const {
        avatarSrc,
        imagePreview,
        error,
        handleImageChange,
        resetImage,
        selectedImage,
    } = useImageUploader({
        initialAvatar: block.src,

        errorMessage,
    });
    const isEmptyContent = !imagePreview || imagePreview.length === 0;

    const { saveImageBlock, deleteImageBlock } = useImageBlockActions({
        blockId: block.id,
        title,
        src: block.src,
        addBlockInArticle,
        onEditBlock,
        deleteBlockFromArticle,
        selectedImage,
        // resetImage,
    });
    const { hasErrors, blockTitleErrors } = useFormValidation(
        {
            blockTitle: title,
        },
        validConfig,
        'article',
    );

    const handleSaveImageBlock = useCallback(async () => {
        await saveImageBlock();
        toggleBlockSaveState();
    }, [saveImageBlock, toggleBlockSaveState]);

    return (
        <>
            {!isBlockSaved ? (
                <VStack justify="center" align="center" max>
                    <VStack gap="16" max>
                        <Input
                            value={title}
                            label={t('Назва зображення')}
                            labelBold
                            gap="16"
                            maxWidth={false}
                            className={cls.InputName}
                            onChange={handleTitleChange}
                            validations={validConfig.blockTitle}
                            maxLengthIndicator
                            errors={blockTitleErrors}
                        />
                        <HStack gap="16" align="end" justify="between" max>
                            <ImagePreview
                                imagePreview={imagePreview}
                                handleImageChange={handleImageChange}
                                resetImage={resetImage}
                                error={error}
                                title={title}
                            />

                            <BlockActionButtonList
                                saveBlock={handleSaveImageBlock}
                                deleteBlock={deleteImageBlock}
                                isSaveDisabled={isEmptyContent}
                            />
                        </HStack>
                    </VStack>
                </VStack>
            ) : (
                <BlockPreview
                    block={{
                        id: block.id,
                        type: ArticleSection.IMAGE,
                        src: block.src,
                        title,
                    }}
                    editBlock={toggleBlockSaveState}
                    deleteBlock={deleteImageBlock}
                    BlockComponent={ArticleImageBlockComponent}
                />
            )}
        </>
    );
};
