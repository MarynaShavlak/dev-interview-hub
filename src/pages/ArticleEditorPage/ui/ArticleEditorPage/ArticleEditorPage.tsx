import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ArticleEditorPage.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slices/createArticleSlice';
import { ArticleMetaForm } from '../ArticleMetaForm/ArticleMetaForm';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';
import { AddBlocksForm } from '../AddBlocksForm/AddBlocksForm';
import { AddHeroForm } from '../AddHeroForm/AddHeroForm';
import { ArticleEditorPageHeader } from '../ArticleEditorPageHeader/ArticleEditorPageHeader';
import { useArticleEditor } from '../../lib/hooks/useArticleEditor/useArticleEditor';
import { SaveArticleError } from '../SaveArticleError/SaveArticleError';

interface ArticleEditorPageProps {
    className?: string;
}

const reducers: ReducersList = {
    createArticle: createArticleReducer,
};

const ArticleEditorPage = memo((props: ArticleEditorPageProps) => {
    const { className } = props;
    const { t } = useTranslation('articleDetails');

    const {
        metadata: { isEditArticlePage, blocks, saveError, isLoading },
        validation,
        heroImage: {
            preview,
            avatarSrc,
            fileTypeError,
            handleImageChange,
            resetImage,
        },
        formActions: { onSave, onClear, onCancelChanges, onDelete, onUpdate },
        blockActions,
    } = useArticleEditor();

    const pageTitle = isEditArticlePage
        ? t('Редагування статті')
        : t('Створення нової статті');

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ArticleEditorPage, {}, [className])}
            >
                <VStack gap="24" max>
                    <HStack justify="between" max className={cls.pageTitleWrap}>
                        <Text title={pageTitle} size="l" />
                        <ArticleEditorPageHeader
                            hasErrors={validation.hasInputErrors}
                            onActions={{
                                clear: onClear,
                                save: onSave,
                                cancel: onCancelChanges,
                                delete: onDelete,
                                update: onUpdate,
                            }}
                            isEditArticlePage={isEditArticlePage}
                        />
                    </HStack>

                    <ArticleMetaForm
                        titleIndex={1}
                        subtitleIndex={2}
                        errors={validation}
                    />
                    <AddHeroForm
                        index={3}
                        error={fileTypeError}
                        handleImageChange={handleImageChange}
                        resetImage={resetImage}
                        imagePreview={avatarSrc || preview}
                    />
                    <AddCategoryForm index={4} />
                    <AddBlocksForm
                        index={5}
                        blocks={blocks}
                        blockActions={blockActions}
                    />
                    {saveError && <SaveArticleError />}
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleEditorPage;
