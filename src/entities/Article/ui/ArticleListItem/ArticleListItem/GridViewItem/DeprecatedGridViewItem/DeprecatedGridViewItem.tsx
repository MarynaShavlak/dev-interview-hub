import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { GridViewItemProps } from '../GridViewItem';
import { Views } from '../../Views/Views';
import { Categories } from '../../Categories/Categories';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { Card } from '@/shared/ui/deprecated/Card';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import cls from '../../ArticleListItem.module.scss';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import defaultImage from '@/shared/assets/images/default-img.png';

export const DeprecatedGridViewItem = memo((props: GridViewItemProps) => {
    const { className, article, target } = props;
    const { t } = useTranslation('articles');
    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls.GRID,
            ])}
        >
            <Card className={cls.card} vStack gap="8">
                <div className={cls.imageWrapper}>
                    <AppImage
                        fallback={<Skeleton width="200px" height="200px" />}
                        errorFallback={
                            <AppImage
                                className={cls.img}
                                src={defaultImage}
                                width="200px"
                                height="200px"
                                alt={t('Дефолтне зображення картинки статті')}
                            />
                        }
                        alt={article.title}
                        src={article.img}
                        className={cls.img}
                    />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <HStack justify="between">
                    <Categories article={article} />
                    <Views article={article} />
                </HStack>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
});
