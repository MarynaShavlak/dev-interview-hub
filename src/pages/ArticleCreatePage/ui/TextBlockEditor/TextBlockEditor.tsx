import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import {
    ArticleSection,
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';
import { MarkupHTMLCreator } from '@/shared/ui/redesigned/MarkupHTMLCreator';
import { BlockActionButtonList } from '@/features/BlockActionButtonList';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { useEditorState } from '../../lib/hooks/useEditorState/useEditorState';
import { useTextBlockActions } from '../../lib/hooks/useTextBlockActions/useTextBlockActions';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { BlockPreview } from '../BlockPreview/BlockPreview';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useTextInput } from '@/shared/lib/hooks/useTextInput/useTextInput';
import { TextEditorForm } from '@/widgets/TextEditorForm';

interface TextBlockEditorProps {
    className?: string;
    // blockId: string;
    block: ArticleTextBlock;
    addBlockInArticle: (block: ArticleTextBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleTextBlock) => void;
}

export const TextBlockEditor = memo((props: TextBlockEditorProps) => {
    const {
        addBlockInArticle,
        deleteBlockFromArticle,
        // blockId,
        block,
        onEditBlock,
        className,
    } = props;
    const initialTitle = block.title || '';
    const initialContentBlock = block.paragraphs || [];
    const isEditMode = Boolean(initialTitle && initialContentBlock);
    const {
        isVisible: isBlockSaved,
        toggleVisibility: toggleBlockSaveState,
        hideElement: hideTextBlock,
        showElement: showTextBlock,
    } = useToggleVisibility();

    const {
        value: title,
        handleChange: handleTitleChange,
        validConfig,
    } = useTextInput(initialTitle);

    const { editorState, paragraphs, onEditorStateChange, isEmptyContent } =
        useEditorState(initialContentBlock);
    const { t } = useTranslation('articleDetails');
    const { saveTextBlock, deleteTextBlock } = useTextBlockActions({
        blockId: block.id,
        title,
        paragraphs,
        addBlockInArticle,
        onEditBlock,
        deleteBlockFromArticle,
    });

    const handleSaveTextBlock = useCallback(() => {
        saveTextBlock();
        hideTextBlock();
    }, [hideTextBlock, saveTextBlock]);

    const handleEditTextBlock = useCallback(() => {
        toggleBlockSaveState();
    }, [toggleBlockSaveState]);

    const { blockTitleErrors } = useFormValidation(
        {
            blockTitle: title,
        },
        validConfig,
        'article',
    );
    const hasInputError = Object.values(blockTitleErrors).some(
        (error) => error,
    );
    if (isEditMode) {
        return (
            <>
                {isBlockSaved ? (
                    <TextEditorForm
                        title={title}
                        handleTitleChange={handleTitleChange}
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        onSave={handleSaveTextBlock}
                        onDelete={deleteTextBlock}
                        isDisabled={isEmptyContent || hasInputError}
                    />
                ) : (
                    // <VStack gap="16" max className={cls.blockWrap}>
                    //     <Input
                    //         value={title}
                    //         label={t('Заголовок блоку')}
                    //         labelBold
                    //         gap="16"
                    //         maxWidth={false}
                    //         className={cls.InputName}
                    //         onChange={handleTitleChange}
                    //         validations={validConfig.blockTitle}
                    //         maxLengthIndicator
                    //         errors={blockTitleErrors}
                    //     />
                    //     <HStack align="end" justify="between" max>
                    //         <MarkupHTMLCreator
                    //             editorState={editorState}
                    //             onEditorStateChange={onEditorStateChange}
                    //         />
                    //         <BlockActionButtonList
                    //             saveBlock={handleSaveTextBlock}
                    //             deleteBlock={deleteTextBlock}
                    //             isSaveDisabled={isEmptyContent || hasInputError}
                    //         />
                    //     </HStack>
                    // </VStack>
                    <BlockPreview
                        block={block}
                        editBlock={showTextBlock}
                        deleteBlock={deleteTextBlock}
                        BlockComponent={ArticleTextBlockComponent}
                    />
                )}
            </>
        );
    }

    return (
        <>
            {!isBlockSaved ? (
                <VStack gap="16" max className={cls.blockWrap}>
                    <Input
                        value={title}
                        label={t('Заголовок блоку')}
                        labelBold
                        gap="16"
                        maxWidth={false}
                        className={cls.InputName}
                        onChange={handleTitleChange}
                        validations={validConfig.blockTitle}
                        maxLengthIndicator
                        errors={blockTitleErrors}
                    />
                    <HStack align="end" justify="between" max>
                        <MarkupHTMLCreator
                            editorState={editorState}
                            onEditorStateChange={onEditorStateChange}
                        />
                        <BlockActionButtonList
                            saveBlock={handleSaveTextBlock}
                            deleteBlock={deleteTextBlock}
                            isSaveDisabled={isEmptyContent || hasInputError}
                        />
                    </HStack>
                </VStack>
            ) : (
                <BlockPreview
                    block={{
                        id: block.id,
                        type: ArticleSection.TEXT,
                        paragraphs,
                        title,
                    }}
                    editBlock={handleEditTextBlock}
                    deleteBlock={deleteTextBlock}
                    BlockComponent={ArticleTextBlockComponent}
                />
            )}
        </>
    );
});
