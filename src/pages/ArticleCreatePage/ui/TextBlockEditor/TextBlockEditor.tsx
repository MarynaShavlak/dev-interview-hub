import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { v4 } from 'uuid';
import cls from './TextBlockEditor.module.scss';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { ArticleSection, ArticleTextBlock } from '@/entities/Article';
import { Icon } from '@/shared/ui/redesigned/Icon';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { Button } from '@/shared/ui/redesigned/Button';
import { extractHtmlStrings } from '@/shared/lib/text/extractHtmlStrings/extractHtmlStrings';
import { initializeEditorStateFromHTML } from '../../lib/utils/initializeEditorStateFromHTML/initializeEditorStateFromHTML';
import { TextBlockPreview } from './TextBlockPreview/TextBlockPreview';
import { MarkupHTMLCreator } from '@/shared/ui/redesigned/MarkupHTMLCreator';

interface TextBlockEditorProps {
    className?: string;
    blockId: string;
    addBlockInArticle: (block: ArticleTextBlock) => void;
    onDeleteTextBlock: (id: string) => void;
    onEditBlock?: (block: ArticleTextBlock) => void;
}

export const TextBlockEditor = memo((props: TextBlockEditorProps) => {
    const {
        className,
        addBlockInArticle,
        onDeleteTextBlock,
        blockId,
        onEditBlock,
    } = props;
    const { t } = useTranslation('articleDetails');
    // const validConfig = useInputValidationConfig();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isAlreadyCreated, setIsAlreadyCreated] = useState(true);
    const [textBlock, setTextBlock] = useState<ArticleTextBlock | null>(null);
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // console.log('draft', convertToRaw(editorState.getCurrentContent()));
    // console.log('content', content);
    const paragraphs = extractHtmlStrings(content);
    console.log('textBlock', textBlock);
    // console.log('paragraphs', paragraphs);
    const isSaveDisabled = paragraphs.length === 0;

    const onEditorStateChange = (newState: EditorState) => {
        setEditorState(newState);
    };

    // const saveTextBlock = useCallback(() => {
    //     const newTextBlock: ArticleTextBlock = {
    //         id: v4(),
    //         type: ArticleSection.TEXT,
    //         paragraphs,
    //         title: '',
    //     };
    //
    //     setTextBlock(newTextBlock);
    //     setIsAlreadyCreated(false);
    //     addBlockInArticle(newTextBlock);
    // }

    const saveTextBlock = useCallback(() => {
        if (textBlock) {
            // Update existing block
            const updatedTextBlock: ArticleTextBlock = {
                ...textBlock,
                paragraphs,
            };

            setTextBlock(updatedTextBlock);
            if (onEditBlock) {
                onEditBlock(updatedTextBlock);
            }
        } else {
            const newTextBlock: ArticleTextBlock = {
                id: v4(),
                type: ArticleSection.TEXT,
                paragraphs,
                title: '',
            };

            setTextBlock(newTextBlock);
            addBlockInArticle(newTextBlock);
        }

        setIsAlreadyCreated(false);
    }, [addBlockInArticle, onEditBlock, paragraphs, textBlock]);

    const deleteTextBlock = useCallback(() => {
        onDeleteTextBlock(blockId);
    }, [onDeleteTextBlock, blockId]);

    const editTextBlock = useCallback(() => {
        const data = textBlock?.paragraphs?.join('\n');
        const state = initializeEditorStateFromHTML(data || '');
        setEditorState(state);
        setIsAlreadyCreated(true);
    }, [textBlock?.paragraphs]);

    // const { formData } = useCreateArticle();
    // console.log('formData', formData);

    return (
        <>
            {isAlreadyCreated && (
                <HStack gap="16" align="end">
                    <MarkupHTMLCreator
                        editorState={editorState}
                        onPastText={setEditorState}
                        onEditorStateChange={onEditorStateChange}
                    />

                    <VStack gap="16">
                        <Button
                            variant="save"
                            addonLeft={
                                <Icon Svg={AddIcon} width={16} height={16} />
                            }
                            onClick={saveTextBlock}
                            className={cls.saveTextBlockButton}
                            disabled={isSaveDisabled}
                        >
                            {t('Зберегти')}
                        </Button>
                        <Button
                            variant="cancel"
                            onClick={deleteTextBlock}
                            className={cls.saveTextBlockButton}
                        >
                            {t('Видалити')}
                        </Button>
                    </VStack>
                </HStack>
            )}
            {!isAlreadyCreated && textBlock && (
                <TextBlockPreview
                    textBlock={textBlock}
                    editTextBlock={editTextBlock}
                    deleteTextBlock={deleteTextBlock}
                />
            )}
        </>
    );
});
