import { memo, useCallback, useState } from 'react';
import { RedesignedRating } from './RedesignedRating/RedesignedRating';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedRating } from './DeprecatedRating/DeprecatedRating';
import { FeedbackContainer } from '../FeedbackContainer/FeedbackContainer';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const Rating = memo((props: RatingCardProps) => {
    const {
        className,
        onAccept,
        feedbackTitle,
        hasFeedback,
        onCancel,
        title,
        rate = 0,
    } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const feedbackContainer = (
        <FeedbackContainer
            isOpen={isModalOpen}
            onClose={cancelHandle}
            onAccept={acceptHandle}
            feedback={feedback}
            setFeedback={setFeedback}
            feedbackTitle={feedbackTitle}
        />
    );
    const commonProps = {
        feedbackContainer,
        starsCount,
        className,
        onSelect: onSelectStars,
        title,
    };
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedRating {...commonProps} />}
            off={<DeprecatedRating {...commonProps} />}
        />
    );
});
