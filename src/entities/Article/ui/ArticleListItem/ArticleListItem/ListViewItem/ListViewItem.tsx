import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleContent } from '../../ArticleContent/ArticleContent';
import { ArticleFooter } from '../../ArticleFooter/ArticleFooter';
import { ArticleHeader } from '../../ArticleHeader/ArticleHeader';
import { ArticleListItemProps } from '..';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../../ArticleListItem.module.scss';

export const ListViewItem = memo((props: ArticleListItemProps) => {
    const { className, article, view } = props;

    const content = (
        <>
            <ArticleHeader article={article} />
            <ArticleContent article={article} />
            <ArticleFooter article={article} />
        </>
    );

    return (
        <div
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
        >
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Card vStack gap="16" className={cls.card}>
                        {content}
                    </Card>
                }
                off={
                    <CardDeprecated vStack gap="8" className={cls.card}>
                        {content}
                    </CardDeprecated>
                }
            />
        </div>
    );
});
