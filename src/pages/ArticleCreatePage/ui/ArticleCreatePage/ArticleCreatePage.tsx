import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
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
import { useArticleCreation } from '../../lib/hooks/useArticleCreation/useArticleCreation';
import { SaveArticleError } from '../SaveArticleError/SaveArticleError';

interface ArticleCreatePageProps {
    className?: string;
}

const reducers: ReducersList = {
    createArticle: createArticleReducer,
};

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation('articleDetails');
    const {
        hasErrors: hasValidationErrors,
        saveError,
        onSaveCreate,
        onCancelCreate,
        validationErrors,
        handleHeroImageChange,
        heroPreview,
        resetHeroImage,
        heroFileTypeError,
        blocks,
        blockActions,
    } = useArticleCreation();

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ArticleCreatePage, {}, [className])}
            >
                <VStack gap="24" max>
                    {saveError && <SaveArticleError />}
                    <HStack justify="between" max className={cls.pageTitleWrap}>
                        <Text title={t('Створення нової статті')} size="l" />
                        <ArticleCreatePageHeader
                            hasErrors={hasValidationErrors}
                            onCancel={onCancelCreate}
                            onSave={onSaveCreate}
                        />
                    </HStack>

                    <TitleSubtitleForm
                        titleIndex={1}
                        subtitleIndex={2}
                        errors={validationErrors}
                    />
                    <AddHeroForm
                        index={3}
                        error={heroFileTypeError}
                        handleImageChange={handleHeroImageChange}
                        resetImage={resetHeroImage}
                        imagePreview={heroPreview}
                    />
                    <AddCategoryForm index={4} />
                    <AddBlocksForm
                        index={5}
                        blocks={blocks}
                        blockActions={blockActions}
                    />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleCreatePage;

// createEmptyTextBlock={createEmptyTextBlock}
// createEmptyCodeBlock={createEmptyCodeBlock}
// createEmptyImageBlock={createEmptyImageBlock}
// addBlock={addBlock}
// updateBlock={updateBlock}
// deleteBlock={deleteBlock}
// deleteAllBlocks={deleteAllBlocks}
