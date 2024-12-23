import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { ArticleSection, ArticleTextBlock } from '@/entities/Article';
import { TextBlockPreview } from './TextBlockPreview/TextBlockPreview';
import { MarkupHTMLCreator } from '@/shared/ui/redesigned/MarkupHTMLCreator';
import { BlockActionButtonList } from '../BlockActionButtonList/BlockActionButtonList';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { useBlockTitle } from '../../lib/hooks/useBlockTitle/useBlockTitle';
import { useEditorState } from '../../lib/hooks/useEditorState/useEditorState';
import { useTextBlockActions } from '../../lib/hooks/useTextBlockActions/useTextBlockActions';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';

interface TextBlockEditorProps {
    className?: string;
    blockId: string;
    addBlockInArticle: (block: ArticleTextBlock) => void;
    onDeleteTextBlock: (id: string) => void;
    onEditBlock?: (block: ArticleTextBlock) => void;
}

export const TextBlockEditor = memo((props: TextBlockEditorProps) => {
    const {
        addBlockInArticle,
        onDeleteTextBlock,
        blockId,
        onEditBlock,
        className,
    } = props;
    const { isVisible: isBlockSaved, toggleVisibility: toggleBlockSaveState } =
        useToggleVisibility();

    const { title, handleTitleChange, validConfig } = useBlockTitle();
    const { editorState, paragraphs, onEditorStateChange, isEmptyContent } =
        useEditorState();
    const { t } = useTranslation('articleDetails');
    const { saveTextBlock, deleteTextBlock } = useTextBlockActions({
        blockId,
        title,
        paragraphs,
        addBlockInArticle,
        onEditBlock,
        onDeleteTextBlock,
    });

    const handleSaveTextBlock = useCallback(() => {
        saveTextBlock();
        toggleBlockSaveState();
    }, [saveTextBlock, toggleBlockSaveState]);

    return (
        <>
            {!isBlockSaved ? (
                <VStack gap="16">
                    <Input
                        value={title}
                        label={t('Заголовок блоку')}
                        labelBold
                        gap="16"
                        maxWidth={false}
                        className={cls.InputName}
                        onChange={handleTitleChange}
                        validations={validConfig.title}
                        maxLengthIndicator
                        // errors={usernameErrors}
                    />
                    <HStack gap="16" align="end">
                        <MarkupHTMLCreator
                            editorState={editorState}
                            onEditorStateChange={onEditorStateChange}
                        />
                        <BlockActionButtonList
                            saveBlock={handleSaveTextBlock}
                            deleteBlock={deleteTextBlock}
                            isSaveDisabled={isEmptyContent}
                        />
                    </HStack>
                </VStack>
            ) : (
                <TextBlockPreview
                    textBlock={{
                        id: blockId,
                        type: ArticleSection.TEXT,
                        paragraphs,
                        title,
                    }}
                    editTextBlock={toggleBlockSaveState}
                    deleteTextBlock={deleteTextBlock}
                />
            )}
        </>
    );
});
