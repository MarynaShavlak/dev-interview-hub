import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleDetailsSkeleton } from './ArticleDetailsSkeleton/ArticleDetailsSkeleton';
import { RedesignedArticleDetails } from './RedesignedArticleDetails/RedesignedArticleDetails';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedArticleDetails } from './DeprecatedArticleDetails/DeprecatedArticleDetails';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    useArticleDetailsError,
    useArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import cls from './ArticleDetails.module.scss';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleDetailsError } from './ArticleDetailsError/ArticleDetailsError';

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useArticleDetailsIsLoading();
    const error = useArticleDetailsError();

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    });

    const renderErrorText = () => (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Text
                    variant="error"
                    align="center"
                    title={t('Виникла непередбачена помилка')}
                />
            }
            off={
                <TextDeprecated
                    align={TextAlign.CENTER}
                    title={t('Виникла непередбачена помилка')}
                />
            }
        />
    );

    const renderContent = () => (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedArticleDetails />}
            off={<DeprecatedArticleDetails />}
        />
    );

    // eslint-disable-next-line no-nested-ternary
    const content = isLoading ? (
        <ArticleDetailsSkeleton />
    ) : error ? (
        <ArticleDetailsError />
    ) : (
        renderContent()
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                gap="16"
                max
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
