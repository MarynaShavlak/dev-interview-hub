import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton/ArticleListItemSkeleton';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/consts';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.GRID ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ));

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.GRID,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation('articles');

    if (!isLoading && !articles.length) {
        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Text size={TextSize.L} title={t('Статті не знайдено')} />
            </div>
        );
    }

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <HStack
                    wrap="wrap"
                    gap="16"
                    className={classNames(cls.ArticleListRedesigned, {}, [])}
                >
                    {isLoading && getSkeletons(view)}
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
            }
            off={
                <div
                    className={classNames(cls.ArticleList, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    {isLoading && getSkeletons(view)}
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
                </div>
            }
        />
    );
});
