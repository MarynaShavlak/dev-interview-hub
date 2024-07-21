import { useCallback, useState } from 'react';

interface UseStarRatingProps {
    selectedStars?: number;
    onSelect?: (starsCount: number) => void;
}

export const useStarRating = ({
    selectedStars = 0,
    onSelect,
}: UseStarRatingProps) => {
    const [activeStarsCount, setActiveStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = useCallback(
        (starsCount: number) => () => {
            if (!isSelected) {
                setActiveStarsCount(starsCount);
            }
        },
        [isSelected],
    );

    const onLeave = useCallback(() => {
        if (!isSelected) {
            setActiveStarsCount(0);
        }
    }, [isSelected]);

    const onClick = useCallback(
        (starsCount: number) => () => {
            if (!isSelected) {
                onSelect?.(starsCount);
                setActiveStarsCount(starsCount);
                setIsSelected(true);
            }
        },
        [isSelected, onSelect],
    );

    return { activeStarsCount, isSelected, onHover, onLeave, onClick };
};
