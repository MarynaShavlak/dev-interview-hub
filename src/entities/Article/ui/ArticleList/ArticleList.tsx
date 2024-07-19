import { HTMLAttributeAnchorTarget, memo, useEffect, useState } from 'react';
import { ArticleListError } from './ArticleListError/ArticleListError';
import { Each } from '@/shared/lib/components/Each/Each';

import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem/ArticleListItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { toggleFeatures } from '@/shared/lib/features';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleListSkeleton } from './ArticleListSkeleton/ArticleListSkeleton';

export interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ArticleView;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.GRID,
        isLoading,
        target,
    } = props;

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (isLoading === false && articles.length > 0) {
            setHasLoaded(true);
        }
    }, [isLoading, articles]);

    const hasSkeletonBeShown = isLoading;
    const hasErrorBeShown = !articles.length && !isLoading && hasLoaded;

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.ArticleListRedesigned,
        off: () => cls.ArticleList,
    });
    const classes = classNames(mainClass, {}, [className, cls[view]]);

    const content = (
        <>
            <Each
                of={articles}
                render={(item) => {
                    return (
                        <ArticleListItem
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                        />
                    );
                }}
            />
            {hasSkeletonBeShown && <ArticleListSkeleton view={view} />}
        </>
    );
    // if (!view) {
    //     return null;
    // }
    // if (hasSkeletonBeShown) {
    //     return <ArticleListSkeleton view={view} />;
    // }
    if (hasErrorBeShown) {
        return <ArticleListError view={view} />;
    }

    if (view === ArticleView.LIST) {
        return (
            <VStack gap="16" className={classes}>
                {content}
            </VStack>
        );
    }

    return (
        <HStack wrap="wrap" gap="16" className={classes}>
            {content}
        </HStack>
    );
});

// import { useTranslation } from 'react-i18next';
// import { HTMLAttributeAnchorTarget, memo } from 'react';
// import { ArticleListItem } from '../ArticleListItem/ArticleListItem/ArticleListItem';
// import { classNames } from '@/shared/lib/classNames/classNames';
// import { Text, TextSize } from '@/shared/ui/deprecated/Text';
// import { ArticleView } from '../../model/consts/articleConsts';
//
// import cls from './ArticleList.module.scss';
// import { Article } from '../../model/types/article';
// import { ToggleFeaturesComponent } from '@/shared/lib/features';
// import { HStack } from '@/shared/ui/redesigned/Stack';
// import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton/ArticleListItemSkeleton';
//
// interface ArticleListProps {
//     className?: string;
//     articles: Article[];
//     isLoading?: boolean;
//     target?: HTMLAttributeAnchorTarget;
//     view?: ArticleView;
// }
//
// const getSkeletons = (view: ArticleView) =>
//     new Array(view === ArticleView.GRID ? 9 : 3).fill(0).map((item, index) => (
//         <ArticleListItemSkeleton
//             // className={cls.card}
//             key={index}
//             view={view}
//         />
//     ));
//
// export const ArticleList = memo((props: ArticleListProps) => {
//     const {
//         className,
//         articles,
//         view = ArticleView.GRID,
//         isLoading,
//         target,
//     } = props;
//     const { t } = useTranslation();
//
//     if (!isLoading && !articles.length) {
//         return (
//             <div
//                 className={classNames(cls.ArticleList, {}, [
//                     className,
//                     cls[view],
//                 ])}
//             >
//                 <Text size={TextSize.L} title={t('Статьи не найдены')} />
//             </div>
//         );
//     }
//
//     return (
//         <ToggleFeaturesComponent
//             feature="isAppRedesigned"
//             on={
//                 <HStack
//                     wrap="wrap"
//                     gap="16"
//                     className={classNames(cls.ArticleListRedesigned, {}, [])}
//                     data-testid="ArticleList"
//                 >
//                     {articles.map((item) => (
//                         <ArticleListItem
//                             article={item}
//                             view={view}
//                             target={target}
//                             key={item.id}
//                             className={cls.card}
//                         />
//                     ))}
//                     {isLoading && getSkeletons(view)}
//                 </HStack>
//             }
//             off={
//                 <div
//                     className={classNames(cls.ArticleList, {}, [
//                         className,
//                         cls[view],
//                     ])}
//                     data-testid="ArticleList"
//                 >
//                     {articles.map((item) => (
//                         <ArticleListItem
//                             article={item}
//                             view={view}
//                             target={target}
//                             key={item.id}
//                             className={cls.card}
//                         />
//                     ))}
//                     {isLoading && getSkeletons(view)}
//                 </div>
//             }
//         />
//     );
// });
