import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import defaultImage from '@/shared/assets/images/default-img.png';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { GridViewItemProps } from '../GridViewItem';
import { ArticleViews } from '../../../ArticleViews/ArticleViews';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { getRouteArticleDetails } from '@/shared/const/router/router';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import cls from '../../ArticleListItem.module.scss';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX } from '@/shared/const/localstorage';

export const RedesignedGridViewItem = memo((props: GridViewItemProps) => {
    const { className, article, target, index } = props;
    const { t } = useTranslation('articles');
    const additionalClasses = getFlexClasses({ vStack: true, gap: '8' });

    const handleSaveArticlesPageScrollPosition = () => {
        sessionStorage.setItem(
            ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX,
            JSON.stringify(index),
        );
    };
    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItemRedesigned, {}, [
                className,
                cls.GRID,
            ])}
            onClick={handleSaveArticlesPageScrollPosition}
        >
            <Card
                border="round"
                padding="0"
                className={classNames(cls.card, {}, additionalClasses)}
            >
                <AppImage
                    fallback={<Skeleton className={cls.img} />}
                    errorFallback={
                        <AppImage
                            src={defaultImage}
                            width="200px"
                            height="200px"
                            className={cls.img}
                            alt={t('Дефолтне зображення картинки статті')}
                        />
                    }
                    alt={article.title}
                    src={article.img}
                    className={cls.img}
                />
                <VStack className={cls.infoWrap} gap="4">
                    <Text
                        title={article.title}
                        className={cls.title}
                        size="s"
                    />
                    <VStack gap="4" className={cls.footer} max justify="end">
                        <HStack justify="between" max>
                            <Text
                                text={article.createdAt}
                                className={cls.date}
                            />
                            <ArticleViews article={article} />
                        </HStack>
                        <Avatar
                            size={32}
                            src={article.user.avatar}
                            className={cls.user}
                            userName={article.user.username}
                        />
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
