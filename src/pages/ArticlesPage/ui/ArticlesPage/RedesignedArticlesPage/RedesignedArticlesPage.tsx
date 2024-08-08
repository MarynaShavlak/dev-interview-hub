import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Page } from '@/widgets/Page';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { useArticlesPage } from '../../../lib/hooks/useArticlesPage/useArticlesPage';
import { ArticlesPageProps } from '../ArticlesPage';

export const RedesignedArticlesPage = ({ className }: ArticlesPageProps) => {
    const { onLoadNextPart } = useArticlesPage();
    return (
        <StickyContentLayout
            left={<ViewSelectorContainer />}
            right={<FiltersContainer />}
            content={
                <Page
                    data-testid="ArticlesPage"
                    onScrollEnd={onLoadNextPart}
                    className={className}
                >
                    <ArticleInfiniteList />
                    <ArticlePageGreeting />
                </Page>
            }
        />
    );
};
