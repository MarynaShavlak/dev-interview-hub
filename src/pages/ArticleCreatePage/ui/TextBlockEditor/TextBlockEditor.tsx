import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { ArticleSection, ArticleTextBlock } from '@/entities/Article';
import { TextBlockPreview } from './TextBlockPreview/TextBlockPreview';
import { MarkupHTMLCreator } from '@/shared/ui/redesigned/MarkupHTMLCreator';
import { TextBlockActionButtonList } from './TextBlockActionButtonList/TextBlockActionButtonList';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { useBlockTitle } from '../../lib/hooks/useBlockTitle/useBlockTitle';
import { useEditorState } from '../../lib/hooks/useEditorState/useEditorState';
import { useTextBlockActions } from '../../lib/hooks/useTextBlockActions/useTextBlockActions';

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

    const [isSaved, setIsSaved] = useState(false);

    const { title, handleTitleChange, validConfig } = useBlockTitle();
    const { editorState, paragraphs, onEditorStateChange } = useEditorState();
    const isSaveDisabled = paragraphs.length === 0;
    const { t } = useTranslation('articleDetails');
    const { saveTextBlock, deleteTextBlock } = useTextBlockActions(
        blockId,
        title,
        paragraphs,
        addBlockInArticle,
        onEditBlock,
        onDeleteTextBlock,
    );

    // const saveTextBlock = useCallback(() => {
    //     const updatedTextBlock: ArticleTextBlock = {
    //         id: blockId,
    //         type: ArticleSection.TEXT,
    //         paragraphs,
    //         title,
    //     };
    //
    //     if (onEditBlock) {
    //         onEditBlock(updatedTextBlock);
    //     } else {
    //         addBlockInArticle(updatedTextBlock);
    //     }
    //     setIsSaved(true);
    // }, [addBlockInArticle, blockId, onEditBlock, paragraphs, title]);
    //
    // const deleteTextBlock = useCallback(() => {
    //     onDeleteTextBlock(blockId);
    // }, [onDeleteTextBlock, blockId]);

    const editTextBlock = useCallback(() => {
        setIsSaved(false);
    }, []);

    return (
        <>
            {!isSaved ? (
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
                        <TextBlockActionButtonList
                            saveTextBlock={() => {
                                saveTextBlock();
                                setIsSaved(true);
                            }}
                            deleteTextBlock={deleteTextBlock}
                            isSaveDisabled={isSaveDisabled}
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
                    editTextBlock={editTextBlock}
                    deleteTextBlock={deleteTextBlock}
                />
            )}
        </>
    );
});
