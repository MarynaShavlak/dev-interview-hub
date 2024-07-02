import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleBlockType } from '../../../../../model/consts/consts';
import { Article, ArticleTextBlock } from '../../../../../model/types/article';
import { Categories } from '../../Categories/Categories';
import { Views } from '../../Views/Views';
import { ArticleTextBlockComponent } from '../../../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import defaultImage from '@/shared/assets/images/default-img-list.png';

import { Card } from '@/shared/ui/deprecated/Card';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../../ArticleListItem.module.scss';

interface ListViewItemProps {
    className?: string;
    article: Article;
}

export const DeprecatedListViewItem = memo((props: ListViewItemProps) => {
    const { className, article } = props;
    const { t } = useTranslation('articles');
    const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
        <div
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls.LIST,
            ])}
        >
            <Card vStack gap="8">
                <VStack gap="8" max>
                    <HStack gap="8" max>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} />
                    </HStack>
                    <Text text={article.createdAt} />
                </VStack>
                <Text title={article.title} />
                <Categories article={article} />
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
                    src={article.img}
                    className={cls.img}
                    alt={article.title}
                />
                {textBlock.paragraphs.slice(0, 1).join(' ') && (
                    <ArticleTextBlockComponent block={textBlock} />
                )}
                <HStack justify="between" max>
                    <AppLink to={getRouteArticleDetails(article.id)}>
                        <Button theme={ButtonTheme.OUTLINE}>
                            {t('Читати більше')}
                        </Button>
                    </AppLink>
                    <Views article={article} />
                </HStack>
            </Card>
        </div>
    );
});
