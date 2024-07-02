import { memo } from 'react';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ArticleListProps } from '../ArticleList';
import { ArticleListItem } from '../../ArticleListItem/ArticleListItem/ArticleListItem';
import { ArticleView } from '../../../model/consts/consts';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../ArticleList.module.scss';

export const RedesignedArticleList = memo((props: ArticleListProps) => {
    const { className, articles, view = ArticleView.GRID, target } = props;

    return (
        <HStack
            wrap="wrap"
            gap="16"
            className={classNames(cls.ArticleListRedesigned, {}, [])}
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
