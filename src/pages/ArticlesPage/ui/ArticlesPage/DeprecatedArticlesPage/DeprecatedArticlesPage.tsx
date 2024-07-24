import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from '../ArticlesPage.module.scss';

interface ContentProps {
    onScrollEnd: () => void;
    className?: string;
}

export const DeprecatedArticlesPage = ({
    onScrollEnd,
    className,
}: ContentProps) => {
    return (
        <Page
            data-testid="ArticlesPage"
            onScrollEnd={onScrollEnd}
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
