import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from '../ArticlesPage.module.scss';
import { useArticlesPage } from '../../../lib/hooks/useArticlesPage/useArticlesPage';
import { ArticlesPageProps } from '../ArticlesPage';

export const DeprecatedArticlesPage = ({ className }: ArticlesPageProps) => {
    const { onLoadNextPart } = useArticlesPage();
    return (
        <Page
            data-testid="ArticlesPage"
            onScrollEnd={onLoadNextPart}
            className={classNames(cls.ArticlesPage, {}, [className])}
        >
            <div className={cls.controlsWrap}>
                <FiltersContainer />
                <ViewSelectorContainer className={cls.viewSelector} />
            </div>

            <ArticleInfiniteList className={cls.list} />
            <ArticlePageGreeting />
        </Page>
    );
};
