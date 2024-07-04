import { useTranslation } from 'react-i18next';
import { memo, ReactElement } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { StarRating } from '@/shared/ui/redesigned/StarRating';

interface RedesignedRatingProps {
    feedbackContainer: ReactElement;
    starsCount: number;
    className?: string;
    onSelect: (starsCount: number) => void;
    title?: string;
}

export const RedesignedRating = memo((props: RedesignedRatingProps) => {
    const { className, starsCount, feedbackContainer, title, onSelect } = props;
    const { t } = useTranslation();

    return (
        <Card max border="round" padding="24">
            <VStack align="center" gap="8">
                <Text title={starsCount ? t('Дякуємо за оцінку!') : title} />
                <StarRating
                    size={40}
                    onSelect={onSelect}
                    selectedStars={starsCount}
                />
            </VStack>
            {feedbackContainer}
        </Card>
    );
});
