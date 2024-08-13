import { ArticlesPageProps } from '../ArticlesPage';
import { ArticleInfiniteList } from '../../ArticleInfiniteList/ArticleInfiniteList';
import cls from '../ArticlesPage.module.scss';
import { FiltersContainer } from '../../FiltersContainer/FiltersContainer';
import { ViewSelectorContainer } from '../../ViewSelectorContainer/ViewSelectorContainer';

export const DeprecatedArticlesPage = ({ className }: ArticlesPageProps) => {
    return (
        <div className={cls.page}>
            <div className={cls.controlsWrap}>
                <FiltersContainer />
                <ViewSelectorContainer className={cls.viewSelector} />
            </div>
            <ArticleInfiniteList className={cls.list} />
        </div>
    );
};

// export const DeprecatedArticlesPage = ({ className }: ArticlesPageProps) => {
//     return (
//         <Page
//             data-testid="ArticlesPage"
//             className={classNames(cls.ArticlesPage, {}, [className])}
//         >
//             <div className={cls.controlsWrap}>
//                 <FiltersContainer />
//                 <ViewSelectorContainer className={cls.viewSelector} />
//             </div>
//
//             <ArticleInfiniteList className={cls.list} />
//             <ArticlePageGreeting />
//         </Page>
//     );
// };

// export const DeprecatedArticlesPage = ({ className }: ArticlesPageProps) => {
//     return (
//         <Page
//             data-testid="ArticlesPage"
//             className={classNames(cls.ArticlesPage, {}, [className])}
//         >
//             <div className={cls.controlsWrap}>
//                 <FiltersContainer />
//                 <ViewSelectorContainer className={cls.viewSelector} />
//             </div>
//
//             <ArticleInfiniteList className={cls.list} />
//             <ArticlePageGreeting />
//         </Page>
//     );
// <main
//     data-testid="ArticlesPage"
//     className={classNames('', {}, [className])}
// >
//     <div className={cls.controlsWrap}>
//         <FiltersContainer />
//         <ViewSelectorContainer className={cls.viewSelector} />
//     </div>
//
//
// </main>
// };
