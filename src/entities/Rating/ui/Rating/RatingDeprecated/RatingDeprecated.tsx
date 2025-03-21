import { useTranslation } from 'react-i18next';
import { memo, ReactElement } from 'react';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { VStack } from '@/shared/ui/common/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/common/StarRating';

interface RatingDeprecatedProps {
    feedbackContainer: ReactElement;
    starsCount: number;
    className?: string;
    onSelect: (starsCount: number) => void;
    title?: string;
}

export const RatingDeprecated = memo((props: RatingDeprecatedProps) => {
    const { className, starsCount, feedbackContainer, title, onSelect } = props;
    const { t } = useTranslation();

    return (
        <CardDeprecated max className={className} data-testid="RatingCard">
            <VStack align="center" gap="8">
                <TextDeprecated
                    title={starsCount ? t('Дякуємо за оцінку!') : title}
                />
                <StarRating
                    size={40}
                    onSelect={onSelect}
                    selectedStars={starsCount}
                />
            </VStack>
            {feedbackContainer}
        </CardDeprecated>
    );
});
