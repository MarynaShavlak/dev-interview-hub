import { memo } from 'react';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { GridViewItemProps } from '../GridViewItem';
import { Views } from '../../Views/Views';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import cls from './RedesignedGridViewItem.module.scss';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const RedesignedGridViewItem = memo((props: GridViewItemProps) => {
    const { className, article, target } = props;
    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.GRID, {}, [className])}
        >
            <Card className={cls.card} border="round" padding="0">
                <AppImage
                    fallback={<Skeleton width={200} height={200} />}
                    alt={article.title}
                    src={article.img}
                    className={cls.img}
                />
                <VStack className={cls.info} gap="4">
                    <Text
                        title={article.title}
                        className={cls.title}
                        size="s"
                    />
                    <VStack gap="4" className={cls.footer} max>
                        <HStack justify="between" max>
                            <Text
                                text={article.createdAt}
                                className={cls.date}
                            />
                            <Views article={article} />
                        </HStack>
                        <HStack gap="4" className={cls.user}>
                            <Avatar size={32} src={article.user.avatar} />
                            <Text bold text={article.user.username} />
                        </HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
