import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ArticleList } from '@/entities/Article';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { getArticles } from '../../model/slices/articlesPageSlice';
import {
    useArticlesPageError,
    useArticlesPageIsLoading,
    useArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const { className } = props;
    const articles = useSelector(getArticles.selectAll);

    const isLoading = useArticlesPageIsLoading();
    const view = useArticlesPageView();
    const error = useArticlesPageError();

    const { t } = useTranslation('articles');
    const errorMessage = t('Помилка запиту статей');

    if (error) {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text text={errorMessage} align="center" variant="error" />}
                off={
                    <TextDeprecated
                        text={errorMessage}
                        align={TextAlign.CENTER}
                        theme={TextTheme.ERROR}
                    />
                }
            />
        );
    }

    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
            className={className}
        />
    );
});
