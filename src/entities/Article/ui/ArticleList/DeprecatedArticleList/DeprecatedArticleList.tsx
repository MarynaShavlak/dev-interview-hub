import { memo } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ArticleListProps } from '../ArticleList';
import { ArticleListItem } from '../../ArticleListItem/ArticleListItem/ArticleListItem';
import { ArticleView } from '../../../model/consts/consts';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../ArticleList.module.scss';

export const DeprecatedArticleList = memo((props: ArticleListProps) => {
    const { className, articles, view = ArticleView.GRID, target } = props;

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.ArticleListRedesigned,
        off: () => cls.ArticleList,
    });
    return (
        <HStack
            wrap="wrap"
            gap="16"
            className={classNames(mainClass, {}, [className, cls[view]])}
        >
            <Each
                of={articles}
                render={(item) => {
                    return (
                        <ArticleListItem
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    );
                }}
            />
        </HStack>
    );
});
