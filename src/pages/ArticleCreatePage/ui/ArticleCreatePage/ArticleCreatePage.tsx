import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ArticleCreatePage.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/common/Stack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slices/createArticleSlice';
// import { TitleSubtitleForm } from '../TitleSubtitleForm/TitleSubtitleForm';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';
import { useCreateArticle } from '../../lib/hooks/useCreateArticle/useCreateArticle';
import { AddBlocksForm } from '../AddBlocksForm/AddBlocksForm';
// import { AddHeroForm } from '../AddHeroForm/AddHeroForm';

interface ArticleCreatePageProps {
    className?: string;
}

const reducers: ReducersList = {
    createArticle: createArticleReducer,
};

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation('articleDetails');
    const { formData } = useCreateArticle();
    console.log('formData ', formData);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ArticleCreatePage, {}, [className])}
            >
                <VStack gap="24" max>
                    <Text title={t('Створення нової статті')} size="l" />
                    {/* <TitleSubtitleForm titleIndex={1} subtitleIndex={2} /> */}
                    {/* <AddHeroForm index={3} /> */}
                    <AddCategoryForm index={4} />
                    <AddBlocksForm index={5} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleCreatePage;
