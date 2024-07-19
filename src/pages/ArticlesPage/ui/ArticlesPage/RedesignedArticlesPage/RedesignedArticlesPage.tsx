import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';
import { classNames } from '@/shared/lib/classNames/classNames';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Page } from '@/widgets/Page';
import cls from '../ArticlesPage.module.scss';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';

interface ContentProps {
    onScrollEnd: () => void;
    className?: string;
}

export const RedesignedArticlesPage = ({
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
