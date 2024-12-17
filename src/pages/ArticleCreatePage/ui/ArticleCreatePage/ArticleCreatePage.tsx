import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ArticleCreatePage.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useCreateArticle } from '../../lib/hooks/useCreateArticle/useCreateArticle';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slices/createArticleSlice';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { TitleSubtitleForm } from '../TitleSubtitleForm/TitleSubtitleForm';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';
import { AddArticleBlocksButtons } from '../AddArticleBlocksButtons/AddArticleBlocksButtons';
import { Article } from '@/entities/Article';
import { Icon } from '@/shared/ui/redesigned/Icon';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleCreatePageProps {
    className?: string;
}

const reducers: ReducersList = {
    createArticle: createArticleReducer,
};

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation('articleDetails');
    const validConfig = useInputValidationConfig();
    const [value, setValue] = useState('');

    const { isVisible: isTextBlockAdded, toggleVisibility: toggleTextBlock } =
        useToggleVisibility();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newState: EditorState) => {
        setEditorState(newState);
    };

    const onAddTextBlockBtnClick = useCallback(() => {
        toggleTextBlock();
    }, [toggleTextBlock]);

    const handleAddParagraph = useCallback(() => {
        const content = draftToHtml(
            convertToRaw(editorState.getCurrentContent()),
        );
        const plainText = editorState.getCurrentContent().getPlainText();
        const newContentState = ContentState.createFromText(plainText);
        const newEditorState = EditorState.createWithContent(newContentState);

        // Update the editor state
        setEditorState(newEditorState);
        console.log(plainText);
        // onAddParagraph(content);
    }, [editorState]);

    const { formData } = useCreateArticle();
    console.log('formData', formData);

    const blocks: Article['blocks'] = [];
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
                <VStack gap="24">
                    <Text title={t('Створення нової статті')} size="l" />
                    <TitleSubtitleForm />
                    <AddCategoryForm />
                    <HStack gap="16" align="start" max>
                        <OrderCard index={4} />
                        <VStack gap="16">
                            <Text text={t('Блоки статті')} bold />
                            <AddArticleBlocksButtons
                                onAddTextBlockBtnClick={onAddTextBlockBtnClick}
                            />

                            {isTextBlockAdded && (
                                <HStack gap="16">
                                    <Editor
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
                                        }}
                                        onEditorStateChange={
                                            onEditorStateChange
                                        }
                                        toolbarClassName={cls.editorToolbar}
                                        wrapperClassName={cls.editorWrapper}
                                        editorClassName={cls.editorTextArea}

                                        // onEditorStateChange={this.onEditorStateChange}
                                    />
                                    <HStack gap="16">
                                        <Button
                                            variant="filled"
                                            addonLeft={
                                                <Icon
                                                    Svg={AddIcon}
                                                    width={16}
                                                    height={16}
                                                />
                                            }
                                            onClick={handleAddParagraph}
                                            className={cls.addParagraphButton}
                                        >
                                            {t('Зберегти')}
                                        </Button>
                                    </HStack>
                                </HStack>
                            )}

                            <Text
                                text={draftToHtml(
                                    convertToRaw(
                                        editorState.getCurrentContent(),
                                    ),
                                )}
                            />
                        </VStack>
                    </HStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleCreatePage;
