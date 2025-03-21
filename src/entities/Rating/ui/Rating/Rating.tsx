import { memo, useCallback, useEffect, useState } from 'react';
import { RatingRedesigned } from './RatingRedesigned/RatingRedesigned';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { RatingDeprecated } from './RatingDeprecated/RatingDeprecated';
import { FeedbackContainer } from '../FeedbackContainer/FeedbackContainer';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onSubmitRating?: (starsCount: number) => void;
    onSubmitFeedback?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const Rating = memo((props: RatingCardProps) => {
    const {
        className,
        onSubmitFeedback,
        feedbackTitle,
        hasFeedback,
        onSubmitRating,
        title,
        rate = 0,
    } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        setStarsCount(rate);
    }, [rate]);

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onSubmitFeedback?.(selectedStarsCount);
            }
        },
        [hasFeedback, onSubmitFeedback],
    );

    const acceptFeedback = useCallback(() => {
        console.log('in acceptFeddback', feedback);
        setIsModalOpen(false);
        onSubmitFeedback?.(starsCount, feedback);
    }, [feedback, onSubmitFeedback, starsCount]);

    const cancelFeedback = useCallback(() => {
        setIsModalOpen(false);
        onSubmitRating?.(starsCount);
    }, [onSubmitRating, starsCount]);

    const feedbackContainer = (
        <FeedbackContainer
            isOpen={isModalOpen}
            onClose={cancelFeedback}
            onSubmitFeedback={acceptFeedback}
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
            on={<RatingRedesigned {...commonProps} />}
            off={<RatingDeprecated {...commonProps} />}
        />
    );
});
