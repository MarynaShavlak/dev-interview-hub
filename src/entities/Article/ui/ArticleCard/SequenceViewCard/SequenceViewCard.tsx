import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router/router';

import cls from '../ArticleCard.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { BaseCardProps } from '../ArticleCard';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';

export const SequenceViewCard = memo((props: BaseCardProps) => {
    const { t } = useTranslation('articles');
    const { className, article, target, handleClick, index } = props;
    const additionalClasses = getFlexClasses({
        hStack: true,
        align: 'center',
    });
    // console.group();
    // console.log('img', article.user.email, article.user.id);
    // console.log(
    //     'img',
    //
    //     article.user.avatar,
    //     article.id,
    // );
    // console.groupEnd();

    return (
        <Card
            border="partial"
            padding="24"
            className={classNames('', {}, [...additionalClasses, className])}
            max
        >
            <HStack justify="between" max>
                <HStack gap="24">
                    {index !== undefined && <OrderCard index={index} />}
                    <AppLink
                        target={target}
                        to={getRouteArticleDetails(article.id)}
                        onClick={handleClick}
                        variant="primary"
                    >
                        <Text
                            text={article.title}
                            className={cls.title}
                            size="m"
                            withTags
                        />
                    </AppLink>
                </HStack>

                <AppLink to={getRouteArticleDetails(article.id)}>
                    <Button variant="outline" onClick={handleClick}>
                        {t('Читати')}
                    </Button>
                </AppLink>
            </HStack>
        </Card>
    );
});
