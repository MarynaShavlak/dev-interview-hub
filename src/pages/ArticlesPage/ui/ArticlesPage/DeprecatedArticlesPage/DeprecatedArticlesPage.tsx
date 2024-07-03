import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../../ArticlesPageFilters/ArticlesPageFilters';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from '../ArticlesPage.module.scss';

interface ContentProps {
    onScrollEnd: () => void;
    className?: string;
}

export const DeprecatedArticlesPageContent = ({
    onScrollEnd,
    className,
}: ContentProps) => {
    return (
        <Page
            data-testid="ArticlesPage"
            onScrollEnd={onScrollEnd}
            className={classNames(cls.ArticlesPage, {}, [className])}
        >
            <ArticlesPageFilters />
            <ArticleInfiniteList className={cls.list} />
            <ArticlePageGreeting />
        </Page>
    );
};
