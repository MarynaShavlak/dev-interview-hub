import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import {
    ArticleSection,
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';
import { MarkupHTMLCreator } from '@/shared/ui/redesigned/MarkupHTMLCreator';
import { BlockActionButtonList } from '../BlockActionButtonList/BlockActionButtonList';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { useBlockTitle } from '../../lib/hooks/useBlockTitle/useBlockTitle';
import { useEditorState } from '../../lib/hooks/useEditorState/useEditorState';
import { useTextBlockActions } from '../../lib/hooks/useTextBlockActions/useTextBlockActions';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { BlockPreview } from '../BlockPreview/BlockPreview';

interface TextBlockEditorProps {
    className?: string;
    blockId: string;
    addBlockInArticle: (block: ArticleTextBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleTextBlock) => void;
}

export const TextBlockEditor = memo((props: TextBlockEditorProps) => {
    const {
        addBlockInArticle,
        deleteBlockFromArticle,
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
        deleteBlockFromArticle,
    });

    const handleSaveTextBlock = useCallback(() => {
        saveTextBlock();

        toggleBlockSaveState();
    }, [saveTextBlock, toggleBlockSaveState]);

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
                        validations={validConfig.title}
                        maxLengthIndicator
                        // errors={usernameErrors}
                    />
                    <HStack align="end" justify="between" max>
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
                <BlockPreview
                    block={{
                        id: blockId,
                        type: ArticleSection.TEXT,
                        paragraphs,
                        title,
                    }}
                    editBlock={toggleBlockSaveState}
                    deleteBlock={deleteTextBlock}
                    BlockComponent={ArticleTextBlockComponent}
                />
            )}
        </>
    );
});
