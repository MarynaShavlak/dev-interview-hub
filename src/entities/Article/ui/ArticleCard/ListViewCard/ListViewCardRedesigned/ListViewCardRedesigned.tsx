import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import defaultImage from '@/shared/assets/images/default-img-list.png';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { ArticleSection } from '../../../../model/consts/articleConsts';
import { ArticleTextBlock } from '../../../../model/types/article';
import { ArticleViews } from '../../../ArticleViews/ArticleViews';
import { AppImage } from '@/shared/ui/common/AppImage';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import cls from '../../ArticleCard.module.scss';
import { BaseCardProps } from '../../ArticleCard';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router/router';
import { truncateText } from '@/shared/lib/text/truncateText/truncateText';
import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';

export const ListViewCardRedesigned = memo((props: BaseCardProps) => {
    const { className, article, handleClick } = props;
    const { t } = useTranslation('articles');
    console.log('article', article);
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
    const additionalClasses = getFlexClasses({ vStack: true, gap: '16' });
    const subtitleText = subtitle.text;
    const subtitleLink = subtitle.link;

    const truncatedLink =
        // eslint-disable-next-line no-nested-ternary
        subtitleLink && subtitleLink.length < 110
            ? subtitleLink
            : subtitleLink
              ? truncateText(subtitleLink, 110)
              : '';
    return (
        <div
            className={classNames(cls.ArticleListItemRedesigned, {}, [
                className,
                cls.LIST,
            ])}
        >
            <Card
                className={classNames('', {}, additionalClasses)}
                padding="16"
            >
                <VStack gap="8" max>
                    <HStack gap="8" max>
                        <Avatar
                            size={32}
                            src={user.avatar}
                            userName={user.username}
                        />
                        <Text text={formatDateString(createdAt)} size="s" />
                    </HStack>
                </VStack>
                <Text title={title} bold data-testid="ArticleListItem.Title" />

                {!subtitleLink && <Text title={subtitleText} />}
                {subtitleLink && (
                    <VStack gap="4">
                        <Text text={subtitleText} />
                        <Text text={truncatedLink} size="s" />
                    </VStack>
                )}

                <AppImage
                    fallback={
                        <Skeleton
                            width="100%"
                            height={250}
                            className={cls.img}
                        />
                    }
                    src={img}
                    className={cls.img}
                    alt={title}
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
                    <AppLink to={getRouteArticleDetails(id)}>
                        <Button variant="outline" onClick={handleClick}>
                            {t('Читати більше')}
                        </Button>
                    </AppLink>
                    <ArticleViews views={views} />
                </HStack>
            </Card>
        </div>
    );
});
