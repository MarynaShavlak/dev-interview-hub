import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import defaultImage from '@/shared/assets/images/default-img-list.png';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleBlockType } from '../../../../../model/consts/articleConsts';
import { Article, ArticleTextBlock } from '../../../../../model/types/article';
import { Views } from '../../Views/Views';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import cls from '../../ArticleListItem.module.scss';

interface ListViewItemProps {
    className?: string;
    article: Article;
}

export const RedesignedListViewItem = memo((props: ListViewItemProps) => {
    const { className, article } = props;
    const { t } = useTranslation('articles');
    const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
        <div
            className={classNames(cls.ArticleListItemRedesigned, {}, [
                className,
                cls.LIST,
            ])}
        >
            <Card vStack gap="16" padding="16">
                <VStack gap="8" max>
                    <HStack gap="8" max>
                        <Avatar
                            size={32}
                            src={article.user.avatar}
                            userName={article.user.username}
                        />
                        <Text text={article.createdAt} size="s" />
                    </HStack>
                </VStack>
                <Text title={article.title} bold />
                <Text title={article.subtitle} size="s" />
                <AppImage
                    fallback={
                        <Skeleton
                            width="100%"
                            height={250}
                            className={cls.img}
                        />
                    }
                    src={article.img}
                    className={cls.img}
                    alt={article.title}
                    errorFallback={
                        <AppImage
                            className={cls.img}
                            src={defaultImage}
                            alt={t('Дефолтне зображення картинки статті')}
                        />
                    }
                />
                {textBlock?.paragraphs && (
                    <Text
                        className={cls.textBlock}
                        text={textBlock.paragraphs.slice(0, 2).join(' ')}
                    />
                )}
                <HStack justify="between" max>
                    <AppLink to={getRouteArticleDetails(article.id)}>
                        <Button variant="outline">{t('Читати більше')}</Button>
                    </AppLink>
                    <Views article={article} />
                </HStack>
            </Card>
        </div>
    );
});
