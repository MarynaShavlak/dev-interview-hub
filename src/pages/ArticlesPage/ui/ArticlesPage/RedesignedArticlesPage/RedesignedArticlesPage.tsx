import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from '../ArticlesPage.module.scss';

interface ContentProps {
    onScrollEnd: () => void;
    className?: string;
}

export const RedesignedArticlesPageContent = ({
    onScrollEnd,
    className,
}: ContentProps) => {
    return (
        <StickyContentLayout
            left={<ViewSelectorContainer />}
            right={<FiltersContainer />}
            content={
                <Page
                    data-testid="ArticlesPage"
                    onScrollEnd={onScrollEnd}
                    className={classNames(cls.ArticlesPageRedesigned, {}, [
                        className,
                    ])}
                >
                    <ArticleInfiniteList className={cls.list} />
                    <ArticlePageGreeting />
                </Page>
            }
        />
    );
};
