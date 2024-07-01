import { memo } from 'react';
import { Categories } from '../../Categories/Categories';
import { Views } from '../../Views/Views';
import { ArticleListItemProps } from '..';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { Card } from '@/shared/ui/deprecated/Card';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import cls from '../../ArticleListItem.module.scss';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

export const GridViewItem = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;

    return (
        <AppLink
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <AppImage
                        fallback={<Skeleton width="200px" height="200px" />}
                        alt={article.title}
                        src={article.img}
                        className={cls.img}
                    />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    <Categories article={article} />
                    <Views article={article} />
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
});
