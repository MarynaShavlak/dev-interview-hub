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

export const SequenceViewCard = memo((props: BaseCardProps) => {
    const { t } = useTranslation('articles');
    const { className, article, target, handleClick, index } = props;
    const additionalClasses = getFlexClasses({
        hStack: true,
        align: 'center',
    });

    const additionalOrderClasses = getFlexClasses({
        hStack: true,
        align: 'center',
        justify: 'center',
    });
    return (
        <Card
            border="partial"
            padding="24"
            className={classNames(cls.SEQUENCE, {}, [
                ...additionalClasses,
                className,
            ])}
        >
            <HStack justify="between" max>
                <HStack gap="24">
                    {index !== undefined && (
                        <Card
                            border="round"
                            variant="light"
                            className={classNames(
                                cls.orderWrap,
                                {},
                                additionalOrderClasses,
                            )}
                        >
                            <Text
                                text={String(index)}
                                className={cls.orderNumber}
                                size="m"
                            />
                        </Card>
                    )}
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
