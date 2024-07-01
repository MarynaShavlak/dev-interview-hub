import { memo } from 'react';
import { Article } from '../../../..';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleContent } from './ArticleContent/ArticleContent';
import { ArticleFooter } from './ArticleFooter/ArticleFooter';
import { ArticleHeader } from './ArticleHeader/ArticleHeader';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../../ArticleListItem.module.scss';

interface ListViewItemProps {
    className?: string;
    article: Article;
}

export const ListViewItem = memo((props: ListViewItemProps) => {
    const { className, article } = props;

    const content = (
        <>
            <ArticleHeader article={article} />
            <ArticleContent article={article} />
            <ArticleFooter article={article} />
        </>
    );

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className])}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Card vStack gap="16" className={cls.card} padding="16">
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
