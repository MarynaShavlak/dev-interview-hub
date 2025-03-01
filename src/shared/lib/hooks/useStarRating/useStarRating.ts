import { useCallback, useState } from 'react';

/**
 * Custom hook for managing the state and behavior of a star rating component.
 * It simplifies handling user interactions such as hovering, clicking, and maintaining the selected rating.
 *
 * @param {number} selectedStars - An optional number indicating the initially selected number of stars. Defaults to 0.
 * @param {function} onSelect - An optional callback function that is invoked when a star rating is selected. Receives the number of stars selected as a parameter.
 *
 * @returns {{
 *    activeStarsCount: number;
 *    isSelected: boolean;
 *    onHover: (starsCount: number) => void;
 *    onLeave: () => void;
 *    onClick: (starsCount: number) => void;
 * }} An object with the following properties:
 *  - `activeStarsCount`: A number indicating the current quantity of stars highlighted during hover or selection.
 *  - `isSelected`: A boolean indicating whether a rating has been already selected. Useful for displaying the final selected rating.
 *  - `onHover`: A function to handle the hover event over a specific number of stars. Updates `activeStarsCount` based on the hovered star count.
 *  - `onLeave`: A function to handle when the mouse leaves the star rating area. Resets `activeStarsCount` to 0 if no stars are selected.
 *  - `onClick`: A function to handle the click event on a specific number of stars. Sets the `activeStarsCount`, updates `isSelected`, and triggers the `onSelect` callback.
 */

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

    const setSelectedStarsState = useCallback((stars: number) => {
        setActiveStarsCount(stars);
        setIsSelected(Boolean(stars));
    }, []);

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

    return {
        activeStarsCount,
        isSelected,
        onHover,
        onLeave,
        onClick,
        setSelectedStarsState,
    };
};
