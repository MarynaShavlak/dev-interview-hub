import React, { memo, useCallback, useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { ArticleSection, ArticleTextBlock } from '@/entities/Article';
import { extractHtmlStrings } from '@/shared/lib/text/extractHtmlStrings/extractHtmlStrings';
import { TextBlockPreview } from './TextBlockPreview/TextBlockPreview';
import { MarkupHTMLCreator } from '@/shared/ui/redesigned/MarkupHTMLCreator';
import { TextBlockActionButtonList } from './TextBlockActionButtonList/TextBlockActionButtonList';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';

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

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isSaved, setIsSaved] = useState(false);

    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const paragraphs = extractHtmlStrings(content);

    const isSaveDisabled = paragraphs.length === 0;

    const [title, setTitle] = useState('');
    const validConfig = useInputValidationConfig();
    const { t } = useTranslation('articleDetails');

    const handleTitleChange = useCallback((value: string) => {
        setTitle(value);
    }, []);

    const onEditorStateChange = (newState: EditorState) => {
        setEditorState(newState);
    };

    const saveTextBlock = useCallback(() => {
        const updatedTextBlock: ArticleTextBlock = {
            id: blockId,
            type: ArticleSection.TEXT,
            paragraphs,
            title,
        };

        if (onEditBlock) {
            onEditBlock(updatedTextBlock);
        } else {
            addBlockInArticle(updatedTextBlock);
        }
        setIsSaved(true);
    }, [addBlockInArticle, blockId, onEditBlock, paragraphs]);

    const deleteTextBlock = useCallback(() => {
        onDeleteTextBlock(blockId);
    }, [onDeleteTextBlock, blockId]);

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
                            onPastText={setEditorState}
                        />
                        <TextBlockActionButtonList
                            saveTextBlock={saveTextBlock}
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

//
// export const TextBlockEditor = memo((props: TextBlockEditorProps) => {
//     const {
//         className,
//         addBlockInArticle,
//         onDeleteTextBlock,
//         blockId,
//         onEditBlock,
//     } = props;
//     const { t } = useTranslation('articleDetails');
//     // const validConfig = useInputValidationConfig();
//     const [editorState, setEditorState] = useState(EditorState.createEmpty());
//     const [isAlreadyCreated, setIsAlreadyCreated] = useState(true);
//     const [textBlock, setTextBlock] = useState<ArticleTextBlock | null>(null);
//     const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
//     // console.log('draft', convertToRaw(editorState.getCurrentContent()));
//     // console.log('content', content);
//     const paragraphs = extractHtmlStrings(content);
//     console.log('textBlock', textBlock);
//     // console.log('paragraphs', paragraphs);
//     const isSaveDisabled = paragraphs.length === 0;
//
//     const onEditorStateChange = (newState: EditorState) => {
//         setEditorState(newState);
//     };
//
//     // const saveTextBlock = useCallback(() => {
//     //     const newTextBlock: ArticleTextBlock = {
//     //         id: v4(),
//     //         type: ArticleSection.TEXT,
//     //         paragraphs,
//     //         title: '',
//     //     };
//     //
//     //     setTextBlock(newTextBlock);
//     //     setIsAlreadyCreated(false);
//     //     addBlockInArticle(newTextBlock);
//     // }
//
//     const saveTextBlock = useCallback(() => {
//         if (textBlock) {
//             // Update existing block
//             const updatedTextBlock: ArticleTextBlock = {
//                 ...textBlock,
//                 paragraphs,
//             };
//
//             setTextBlock(updatedTextBlock);
//             if (onEditBlock) {
//                 onEditBlock(updatedTextBlock);
//             }
//         } else {
//             const newTextBlock: ArticleTextBlock = {
//                 id: v4(),
//                 type: ArticleSection.TEXT,
//                 paragraphs,
//                 title: '',
//             };
//
//             setTextBlock(newTextBlock);
//             addBlockInArticle(newTextBlock);
//         }
//
//         setIsAlreadyCreated(false);
//     }, [addBlockInArticle, onEditBlock, paragraphs, textBlock]);
//
//     const deleteTextBlock = useCallback(() => {
//         console.log('id', blockId);
//         onDeleteTextBlock(blockId);
//     }, [onDeleteTextBlock, blockId]);
//
//     const editTextBlock = useCallback(() => {
//         const data = textBlock?.paragraphs?.join('\n');
//         const state = initializeEditorStateFromHTML(data || '');
//         setEditorState(state);
//         setIsAlreadyCreated(true);
//     }, [textBlock?.paragraphs]);
//
//     return (
//         <>
//             {isAlreadyCreated && (
//                 <HStack gap="16" align="end">
//                     <MarkupHTMLCreator
//                         editorState={editorState}
//                         onPastText={setEditorState}
//                         onEditorStateChange={onEditorStateChange}
//                     />
//                     <TextBlockActionButtonList
//                         saveTextBlock={saveTextBlock}
//                         deleteTextBlock={deleteTextBlock}
//                         isSaveDisabled={isSaveDisabled}
//                     />
//                 </HStack>
//             )}
//             {!isAlreadyCreated && textBlock && (
//                 <TextBlockPreview
//                     textBlock={textBlock}
//                     editTextBlock={editTextBlock}
//                     deleteTextBlock={deleteTextBlock}
//                 />
//             )}
//         </>
//     );
// });
