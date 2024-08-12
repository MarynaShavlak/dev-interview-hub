import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ArticlesPageProps } from '../ArticlesPage';
import { useArticlesPage } from '../../../lib/hooks/useArticlesPage/useArticlesPage';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';

export const RedesignedArticlesPage = ({ className }: ArticlesPageProps) => {
    const { onLoadNextPart } = useArticlesPage();

    return (
        <StickyContentLayout
            left={<ViewSelectorContainer />}
            right={<FiltersContainer />}
            content={
                // <Page
                //     data-testid="ArticlesPage"
                //     onScrollEnd={onLoadNextPart}
                //     className={className}
                // >
                <>
                    <ArticleInfiniteList onScrollEnd={onLoadNextPart} />
                    <ArticlePageGreeting />
                </>
                // </Page>
            }
        />
    );
};
