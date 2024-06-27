import { HTMLAttributeAnchorTarget, memo } from 'react';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { ArticleContent } from './ArticleContent/ArticleContent';
import { ArticleFooter } from './ArticleFooter/ArticleFooter';
import { ArticleHeader } from './ArticleHeader/ArticleHeader';
import { AppImage } from '@/shared/ui/deprecated/AppImage';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { Card } from '@/shared/ui/deprecated/Card';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { ArticleBlockType, ArticleView } from '../../model/consts/consts';
import cls from './ArticleListItem.module.scss';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;

    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const views = (
        <HStack gap="8" className={cls.views}>
            <Text text={String(article.views)} />
            <Icon Svg={EyeIcon} />
        </HStack>
    );

    const renderBigView = () => {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card}>
                    <ArticleHeader article={article} />
                    <ArticleContent
                        article={article}
                        textBlock={textBlock}
                        types={types}
                    />
                    <ArticleFooter article={article} views={views} />
                </Card>
            </div>
        );
    };

    const renderSmallView = () => {
        return (
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
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        );
    };

    if (view === ArticleView.BIG) {
        return renderBigView();
    }

    return (
        <AppLink
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
        >
            {renderSmallView()}
        </AppLink>
    );
});
