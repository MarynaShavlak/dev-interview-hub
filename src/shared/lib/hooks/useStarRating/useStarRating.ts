import { useCallback, useState } from 'react';

interface UseStarRatingProps {
    selectedStars?: number;
    onSelect?: (starsCount: number) => void;
}

export const useStarRating = ({
    selectedStars = 0,
    onSelect,
}: UseStarRatingProps) => {
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = useCallback(
        (starsCount: number) => () => {
            if (!isSelected) {
                setCurrentStarsCount(starsCount);
            }
        },
        [isSelected],
    );

    const onLeave = useCallback(() => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    }, [isSelected]);

    const onClick = useCallback(
        (starsCount: number) => () => {
            if (!isSelected) {
                onSelect?.(starsCount);
                setCurrentStarsCount(starsCount);
                setIsSelected(true);
            }
        },
        [isSelected, onSelect],
    );

    return { currentStarsCount, isSelected, onHover, onLeave, onClick };
};
