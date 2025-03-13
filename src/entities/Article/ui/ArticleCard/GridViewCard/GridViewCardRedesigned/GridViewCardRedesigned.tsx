import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { ArticleViews } from '../../../ArticleViews/ArticleViews';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { AppImage } from '@/shared/ui/common/AppImage';
import { getRouteArticleDetails } from '@/shared/const/router/router';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import cls from '../../ArticleCard.module.scss';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { BaseCardProps } from '../../ArticleCard';
import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';
import { Icon } from '@/shared/ui/redesigned/Icon';
import DefaultImage from '@/shared/assets/icons/logoWithText.svg';

export const GridViewCardRedesigned = memo((props: BaseCardProps) => {
    const { className, article, target, handleClick } = props;
    const { t } = useTranslation('articles');
    const { createdAt, title, img, id, views, user } = article;
    const additionalClasses = getFlexClasses({
        vStack: true,
        gap: '8',
    });

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(id)}
            className={classNames(cls.ArticleListItemRedesigned, {}, [
                className,
                cls.GRID,
            ])}
            onClick={handleClick}
        >
            <Card
                border="round"
                padding="0"
                className={classNames(cls.card, {}, additionalClasses)}
            >
                <AppImage
                    fallback={<Skeleton className={cls.img} />}
                    errorFallback={
                        <HStack max justify="center" className={cls.iconWrap}>
                            <Icon
                                Svg={DefaultImage}
                                height="100px"
                                width="100px"
                            />
                        </HStack>
                    }
                    alt={title}
                    src={img}
                    className={cls.img}
                />
                <VStack className={cls.infoWrap} gap="4">
                    <Text
                        title={title}
                        className={cls.title}
                        size="s"
                        data-testid="ArticleListItem.Title"
                    />
                    <VStack gap="4" className={cls.footer} max justify="end">
                        <HStack justify="between" max>
                            <Text
                                text={formatDateString(createdAt)}
                                className={cls.date}
                            />
                            <ArticleViews views={views} />
                        </HStack>
                        <Avatar
                            size={32}
                            src={user?.avatar}
                            className={cls.user}
                            userName={user?.username}
                            textLength={20}
                        />
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
