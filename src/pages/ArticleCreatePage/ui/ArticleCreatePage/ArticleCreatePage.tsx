import { useTranslation } from 'react-i18next';
import React, { memo, useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ArticleCreatePage.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { Button } from '@/shared/ui/redesigned/Button';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { useCreateArticle } from '../../lib/hooks/useCreateArticle/useCreateArticle';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slices/createArticleSlice';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { TitleSubtitleForm } from '../TitleSubtitleForm/TitleSubtitleForm';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';

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

    const {
        formData,

        error,
        isLoading,
        // readonly,
        // onChangeFirstname,
        // onChangeLastname,
        // onChangeUsername,
        // onChangeAvatar,
        // onChangeCountry,
        // onChangeCurrency,
        // onChangeAge,
        // onChangeCity,
        // onFileUpload,
    } = useCreateArticle();
    console.log('formData', formData);

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
                            <HStack gap="24">
                                <Button
                                    variant="filled"
                                    addonLeft={
                                        <Icon
                                            Svg={AddIcon}
                                            width={16}
                                            height={16}
                                        />
                                    }
                                    className={cls.addLinkButton}
                                    onClick={() => {
                                        toggleTextBlock();
                                        console.log('add text block');
                                    }}
                                >
                                    {t('Додати')} {t('блок')}
                                    &nbsp;
                                    <b>{t('тексту')}</b>
                                </Button>
                                <Button
                                    variant="filled"
                                    addonLeft={
                                        <Icon
                                            Svg={AddIcon}
                                            width={16}
                                            height={16}
                                        />
                                    }
                                    className={cls.addLinkButton}
                                    onClick={() =>
                                        console.log('add code block')
                                    }
                                >
                                    {t('Додати')} {t('блок')}
                                    &nbsp;
                                    <b>{t('коду')}</b>
                                </Button>
                                <Button
                                    variant="filled"
                                    addonLeft={
                                        <Icon
                                            Svg={AddIcon}
                                            width={16}
                                            height={16}
                                        />
                                    }
                                    className={cls.addLinkButton}
                                    onClick={() =>
                                        console.log('add image block')
                                    }
                                >
                                    {t('Додати')} {t('блок')}
                                    &nbsp;
                                    <b>{t('зображення')}</b>
                                </Button>
                            </HStack>
                            {isTextBlockAdded && (
                                <VStack gap="16" align="start" max>
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={
                                            onEditorStateChange
                                        }
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        placeholder={`${t('Напишіть тект параграфу')}...`}
                                        // onEditorStateChange={this.onEditorStateChange}
                                    />
                                </VStack>
                            )}
                        </VStack>
                    </HStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleCreatePage;
