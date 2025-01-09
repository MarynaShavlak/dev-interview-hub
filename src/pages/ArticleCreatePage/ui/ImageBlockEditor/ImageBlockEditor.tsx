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
import { Input } from '@/shared/ui/redesigned/Input';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';

import { useImageBlockActions } from '../../lib/hooks/useImageBlockActions/useImageBlockActions';
import { BlockActionButtonList } from '@/features/BlockActionButtonList';
import { ImagePreview } from './ImagePreview/ImagePreview';
import { BlockPreview } from '../BlockPreview/BlockPreview';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { ImageUploadError } from './ImageUploadError/ImageUploadError';
import { useTextInput } from '@/shared/lib/hooks/useTextInput/useTextInput';

interface ImageBlockEditorProps {
    block: ArticleImageBlock;
    addBlockInArticle: (block: ArticleImageBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleImageBlock) => void;
}

export const ImageBlockEditor = (props: ImageBlockEditorProps) => {
    const { block, addBlockInArticle, deleteBlockFromArticle, onEditBlock } =
        props;

    const { t } = useTranslation('articleDetails');

    const {
        value: title,
        handleChange: handleTitleChange,
        validConfig,
    } = useTextInput();
    const { isVisible: isBlockSaved, toggleVisibility: toggleBlockSaveState } =
        useToggleVisibility();

    const {
        imagePreview,
        error: imageTypeError,
        handleImageChange,
        resetImage,
        selectedImage,
    } = useImageUploader({
        initialAvatar: block.src,
    });
    const isEmptyContent = !imagePreview || imagePreview.length === 0;

    const { saveImageBlock, deleteImageBlock, uploadError } =
        useImageBlockActions({
            blockId: block.id,
            title,
            src: block.src,
            addBlockInArticle,
            onEditBlock,
            deleteBlockFromArticle,
            selectedImage,
        });

    const { blockTitleRequiredErrors } = useFormValidation(
        {
            blockTitle: title,
        },
        validConfig,
        'article',
    );
    const hasInputError = Object.values(blockTitleRequiredErrors).some(
        (error) => error,
    );

    const handleSaveImageBlock = useCallback(async () => {
        await saveImageBlock();
        toggleBlockSaveState();
    }, [saveImageBlock, toggleBlockSaveState]);

    if (!isBlockSaved) {
        return (
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
                        validations={validConfig.blockTitleRequired}
                        maxLengthIndicator
                        errors={blockTitleRequiredErrors}
                    />
                    <HStack gap="16" align="end" justify="between" max>
                        <ImagePreview
                            imagePreview={imagePreview}
                            handleImageChange={handleImageChange}
                            resetImage={resetImage}
                            error={imageTypeError}
                            title={title}
                        />

                        <BlockActionButtonList
                            saveBlock={handleSaveImageBlock}
                            deleteBlock={deleteImageBlock}
                            isSaveDisabled={
                                isEmptyContent ||
                                hasInputError ||
                                !!imageTypeError
                            }
                        />
                    </HStack>
                </VStack>
            </VStack>
        );
    }
    if (uploadError) {
        return <ImageUploadError onRetry={toggleBlockSaveState} />;
    }

    return (
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
    );
};
