import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { GridViewItemProps } from '../GridViewItem';
import { Views } from '../../Views/Views';
import { Categories } from '../../Categories/Categories';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { getRouteArticleDetails } from '@/shared/const/router/router';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { Card } from '@/shared/ui/deprecated/Card';
import cls from '../../ArticleListItem.module.scss';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import defaultImage from '@/shared/assets/images/default-img.png';
import { AppLink } from '@/shared/ui/deprecated/AppLink';

export const DeprecatedGridViewItem = memo((props: GridViewItemProps) => {
    const { className, article, target } = props;
    const { t } = useTranslation('articles');
    const additionalClasses = getFlexClasses({ vStack: true, gap: '8' });

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
            <Card className={classNames(cls.card, {}, additionalClasses)}>
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
                <HStack justify="between" max>
                    <Categories article={article} />
                    <Views article={article} />
                </HStack>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
});
