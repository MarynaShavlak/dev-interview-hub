import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import defaultImage from '@/shared/assets/images/default-img-list.png';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { ArticleBlockType } from '../../../../model/consts/articleConsts';
import { ArticleTextBlock } from '../../../../model/types/article';
import { ArticleViews } from '../../../ArticleViews/ArticleViews';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import cls from '../../ArticleCard.module.scss';
import { BaseCardProps } from '../../ArticleCard';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router/router';

export const RedesignedListViewCard = memo((props: BaseCardProps) => {
    const { className, article, handleClick } = props;
    const { t } = useTranslation('articles');
    const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    const additionalClasses = getFlexClasses({ vStack: true, gap: '16' });

    return (
        <div
            className={classNames(cls.ArticleListItemRedesigned, {}, [
                className,
                cls.LIST,
            ])}
        >
            <Card
                className={classNames('', {}, additionalClasses)}
                // vStack
                // gap="16"
                padding="16"
            >
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
                        <Button variant="outline" onClick={handleClick}>
                            {t('Читати більше')}
                        </Button>
                    </AppLink>
                    <ArticleViews article={article} />
                </HStack>
            </Card>
        </div>
    );
});
