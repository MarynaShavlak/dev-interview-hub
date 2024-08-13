import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { ArticlesPageProps } from '../ArticlesPage';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';

export const RedesignedArticlesPage = ({ className }: ArticlesPageProps) => {
    return (
        <StickyContentLayout
            left={<ViewSelectorContainer />}
            right={<FiltersContainer />}
            content={
                <main className={className} data-testid="ArticlesPage">
                    <ArticleInfiniteList />
                    <ArticlePageGreeting />
                </main>
            }
        />
    );
};
