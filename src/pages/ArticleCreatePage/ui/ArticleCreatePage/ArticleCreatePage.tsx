import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ArticleCreatePage.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slices/createArticleSlice';
import { TitleSubtitleForm } from '../TitleSubtitleForm/TitleSubtitleForm';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';
import { AddBlocksForm } from '../AddBlocksForm/AddBlocksForm';
import { AddHeroForm } from '../AddHeroForm/AddHeroForm';
import { ArticleCreatePageHeader } from '../ArticleCreatePageHeader/ArticleCreatePageHeader';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useArticleEditor } from '../../lib/hooks/useArticleEditor/useArticleEditor';
import { useArticleContentBlocks } from '../../lib/hooks/useArticleContentBlocks/useArticleContentBlocks';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { uploadArticleImageThunk } from '../../model/services/uploadArticleImageThunk/uploadImageThunk';
import { createArticleThunk } from '../../model/services/createArticleThunk/createArticleThunk';
import { getRouteArticleDetails } from '@/shared/const/router/router';

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
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        formData,
        uploadedArticleImage,
        onFileUpload,
        onResetArticle,
        onChangeHeroImage,
    } = useArticleEditor();

    const { hasErrors, titleErrors, subtitleTextErrors, subtitleLinkErrors } =
        useFormValidation(
            {
                title: formData?.title || '',
                subtitleText: formData?.subtitle.text || '',
                subtitleLink: formData?.subtitle.link || '',
            },
            validConfig,
            'article',
        );
    const {
        blocks,
        createEmptyTextBlock,
        createEmptyCodeBlock,
        createEmptyImageBlock,
        addBlock,
        updateBlock,
        deleteBlock,
        deleteAllBlocks,
    } = useArticleContentBlocks();

    const { imagePreview, error, handleImageChange, resetImage } =
        useImageUploader({
            initialAvatar: '',
            onFileUpload,
        });

    const onCancelCreate = useCallback(() => {
        onResetArticle();
        deleteAllBlocks();
        resetImage();
    }, [deleteAllBlocks, onResetArticle, resetImage]);

    const onSaveCreate = useCallback(async () => {
        if (uploadedArticleImage) {
            const url = await dispatch(
                uploadArticleImageThunk(uploadedArticleImage),
            ).unwrap();
            onChangeHeroImage(url);
        }
        if (uploadedArticleImage == null) {
            onChangeHeroImage('');
        }
        const savedArticle = await dispatch(createArticleThunk()).unwrap();
        if (savedArticle?.id) {
            navigate(getRouteArticleDetails(savedArticle.id));
        }
        console.log('save');
        onCancelCreate();
    }, [
        dispatch,
        navigate,
        onCancelCreate,
        onChangeHeroImage,
        uploadedArticleImage,
    ]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ArticleCreatePage, {}, [className])}
            >
                <VStack gap="24" max>
                    <HStack justify="between" max className={cls.pageTitleWrap}>
                        <Text title={t('Створення нової статті')} size="l" />
                        <ArticleCreatePageHeader
                            hasErrors={hasErrors}
                            onCancel={onCancelCreate}
                            onSave={onSaveCreate}
                        />
                    </HStack>

                    <TitleSubtitleForm
                        titleIndex={1}
                        subtitleIndex={2}
                        errors={{
                            titleErrors,
                            subtitleTextErrors,
                            subtitleLinkErrors,
                        }}
                    />
                    <AddHeroForm
                        index={3}
                        error={error}
                        handleImageChange={handleImageChange}
                        resetImage={resetImage}
                        imagePreview={imagePreview}
                    />
                    <AddCategoryForm index={4} />
                    <AddBlocksForm
                        index={5}
                        blocks={blocks}
                        createEmptyTextBlock={createEmptyTextBlock}
                        createEmptyCodeBlock={createEmptyCodeBlock}
                        createEmptyImageBlock={createEmptyImageBlock}
                        addBlock={addBlock}
                        updateBlock={updateBlock}
                        deleteBlock={deleteBlock}
                        deleteAllBlocks={deleteAllBlocks}
                    />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleCreatePage;
