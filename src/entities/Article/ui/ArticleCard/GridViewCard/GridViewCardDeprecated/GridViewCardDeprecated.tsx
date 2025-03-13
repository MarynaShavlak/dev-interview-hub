import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { ArticleViews } from '../../../ArticleViews/ArticleViews';
import { ArticleCategories } from '../../../ArticleCategories/ArticleCategories';
import { HStack } from '@/shared/ui/common/Stack';
import { AppImage } from '@/shared/ui/common/AppImage';
import { getRouteArticleDetails } from '@/shared/const/router/router';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { Card } from '@/shared/ui/deprecated/Card';
import cls from '../../ArticleCard.module.scss';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import DefaultImage from '@/shared/assets/icons/logoWithText.svg';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { useHover } from '@/shared/lib/hooks/useHover/useHover';
import { BaseCardProps } from '../../ArticleCard';
import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';
import { Icon } from '@/shared/ui/deprecated/Icon';

export const GridViewCardDeprecated = memo((props: BaseCardProps) => {
    const { className, article, target, handleClick } = props;
    const { t } = useTranslation('articles');

    const {
        createdAt,
        title,
        img,
        id,
        views,
        user,
        subtitle,
        category,
        blocks,
    } = article;
    const [isHover, bindHover] = useHover();
    const additionalCardClasses = getFlexClasses({ vStack: true, gap: '8' });
    const itemClasses = classNames(
        cls.ArticleListItem,
        { [cls.hover]: isHover },
        [className || '', cls.GRID],
    );

    return (
        <AppLink
            {...bindHover}
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(id)}
            className={itemClasses}
            onClick={handleClick}
        >
            <Card className={classNames(cls.card, {}, additionalCardClasses)}>
                <div className={cls.imageWrapper}>
                    <AppImage
                        fallback={<Skeleton width="200px" height="200px" />}
                        errorFallback={
                            <Icon
                                Svg={DefaultImage}
                                width="200px"
                                height="200px"
                            />
                        }
                        alt={title}
                        src={img}
                        className={cls.img}
                    />
                    <Text
                        text={formatDateString(createdAt)}
                        className={cls.date}
                    />
                </div>
                <HStack justify="between">
                    <ArticleCategories article={article} />
                    <ArticleViews views={views} />
                </HStack>
                <Text
                    text={title}
                    withTags
                    className={cls.title}
                    data-testid="ArticleListItem.Title"
                />
            </Card>
        </AppLink>
    );
});
