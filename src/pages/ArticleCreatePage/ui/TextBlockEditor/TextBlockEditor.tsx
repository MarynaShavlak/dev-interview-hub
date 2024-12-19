import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { ContentState, convertToRaw, EditorState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { v4 } from 'uuid';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useCreateArticle } from '../../lib/hooks/useCreateArticle/useCreateArticle';
import {
    ArticleSection,
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';
import { Icon } from '@/shared/ui/redesigned/Icon';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { Button } from '@/shared/ui/redesigned/Button';
import { extractHtmlStrings } from '@/shared/lib/text/extractHtmlStrings/extractHtmlStrings';

interface TextBlockEditorProps {
    className?: string;
    blockId: string;
    addBlockInArticle: (block: ArticleTextBlock) => void;
    onDeleteTextBlock: (id: string) => void;
}

export const TextBlockEditor = memo((props: TextBlockEditorProps) => {
    const { className, addBlockInArticle, onDeleteTextBlock, blockId } = props;
    const { t } = useTranslation('articleDetails');
    const validConfig = useInputValidationConfig();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [textBlock, setTextBlock] = useState<ArticleTextBlock | null>(null);
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log('draft', convertToRaw(editorState.getCurrentContent()));
    console.log('content', content);
    const paragraphs = extractHtmlStrings(content);
    console.log('paragraphs', paragraphs);
    const isSaveDisabled = paragraphs.length === 0;

    const onEditorStateChange = (newState: EditorState) => {
        setEditorState(newState);
    };

    const saveTextBlock = useCallback(() => {
        const newTextBlock: ArticleTextBlock = {
            id: v4(),
            type: ArticleSection.TEXT,
            paragraphs,
            title: '',
        };

        setTextBlock(newTextBlock);
        addBlockInArticle(newTextBlock);
    }, [addBlockInArticle, paragraphs]);

    const deleteTextBlock = useCallback(() => {
        onDeleteTextBlock(blockId);
    }, [onDeleteTextBlock, blockId]);

    const { formData } = useCreateArticle();
    // console.log('formData', formData);

    const handlePastedText = (
        text: string,
        html: string | undefined,
        editorState: EditorState,
    ) => {
        if (!text) {
            return false;
        }

        const plainTextContent = ContentState.createFromText(text);
        const currentSelection = editorState.getSelection();
        const newContentState = Modifier.replaceWithFragment(
            editorState.getCurrentContent(),
            currentSelection,
            plainTextContent.getBlockMap(),
        );

        const newEditorState = EditorState.push(
            editorState,
            newContentState,
            'insert-fragment',
        );

        setEditorState(newEditorState);

        return true;
    };

    return (
        <>
            {!textBlock && (
                <HStack gap="16" align="end">
                    <Editor
                        handlePastedText={handlePastedText}
                        editorState={editorState}
                        toolbar={{
                            options: [
                                'inline',
                                'emoji',
                                'list',

                                'remove',
                                'history',
                            ],
                            inline: {
                                options: [
                                    'bold',
                                    'italic',
                                    'underline',
                                    'strikethrough',
                                    'superscript',
                                    'subscript',
                                ],
                            },
                            list: {
                                options: ['unordered', 'ordered'],
                            },
                        }}
                        onEditorStateChange={onEditorStateChange}
                        toolbarClassName={cls.editorToolbar}
                        wrapperClassName={cls.editorWrapper}
                        editorClassName={cls.editorTextArea}

                        // onEditorStateChange={this.onEditorStateChange}
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
            {textBlock && <ArticleTextBlockComponent block={textBlock} />}
        </>
    );
});
