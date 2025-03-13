import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { ArticleSection } from '../../../../model/consts/articleConsts';
import { ArticleTextBlock } from '../../../../model/types/article';
import { ArticleCategories } from '../../../ArticleCategories/ArticleCategories';
import { ArticleViews } from '../../../ArticleViews/ArticleViews';
import { ArticleTextBlockComponent } from '../../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { getRouteArticleDetails } from '@/shared/const/router/router';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/common/AppImage';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import defaultImage from '@/shared/assets/images/default-img-list.png';

import { Card } from '@/shared/ui/deprecated/Card';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../../ArticleCard.module.scss';
import { BaseCardProps } from '../../ArticleCard';
import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';

export const ListViewCardDeprecated = memo((props: BaseCardProps) => {
    const { className, article, handleClick } = props;
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
    const textBlock = blocks.find(
        (block) => block.type === ArticleSection.TEXT,
    ) as ArticleTextBlock;

    const additionalClasses = getFlexClasses({ vStack: true, gap: '8' });

    return (
        <div
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls.LIST,
            ])}
        >
            <Card className={classNames('', {}, additionalClasses)}>
                <VStack gap="8" max>
                    <HStack gap="8" max>
                        <Avatar size={30} src={user.avatar} />
                        <Text text={user.username} />
                    </HStack>
                    <Text text={formatDateString(createdAt)} />
                </VStack>
                <Text title={title} data-testid="ArticleListItem.Title" />
                <ArticleCategories article={article} />
                <AppImage
                    fallback={<Skeleton width="100%" height="250px" />}
                    errorFallback={
                        <AppImage
                            className={cls.img}
                            src={defaultImage}
                            width="100%"
                            height="250px"
                            alt={t('Дефолтне зображення картинки статті')}
                        />
                    }
                    src={img}
                    className={cls.img}
                    alt={title}
                />
                {textBlock.paragraphs.slice(0, 1).join(' ') && (
                    <ArticleTextBlockComponent block={textBlock} withTags />
                )}
                <HStack justify="between" max>
                    <AppLink to={getRouteArticleDetails(id)}>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={handleClick}
                        >
                            {t('Читати більше')}
                        </Button>
                    </AppLink>
                    <ArticleViews views={views} />
                </HStack>
            </Card>
        </div>
    );
});
