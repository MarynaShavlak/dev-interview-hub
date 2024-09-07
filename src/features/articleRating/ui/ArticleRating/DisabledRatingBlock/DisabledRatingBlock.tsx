import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/common/StarRating';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';

export const DisabledRatingBlock = memo(() => {
    const { t } = useTranslation();
    const text = t("Оцінка статей скоро з'явиться");
    const additionalClasses = getFlexClasses({
        vStack: true,
        gap: '8',
        align: 'center',
    });

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames('', {}, additionalClasses)}
                    max
                    border="partial"
                    padding="24"
                >
                    <StarRating size={20} disabled />
                    <Text text={text} />
                </Card>
            }
            off={
                <CardDeprecated
                    className={classNames('', {}, additionalClasses)}
                    max
                >
                    <StarRating size={20} disabled />
                    <TextDeprecated text={text} />
                </CardDeprecated>
            }
        />
    );
});
