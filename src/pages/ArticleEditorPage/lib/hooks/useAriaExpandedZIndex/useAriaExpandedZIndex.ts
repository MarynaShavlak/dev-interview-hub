import { useEffect, useState } from 'react';
import { getElementByTestId } from '@/shared/lib/getDOMElements/getDOMElement';

/**
 * Hook that manages z-index based on the aria-expanded state of an element
 *
 * @param {string} testId - The test ID of the element to observe
 * @param {number} expandedZIndex - Z-index value when aria-expanded is true
 * @param {number} collapsedZIndex - Z-index value when aria-expanded is false
 * @returns {number} The current z-index value
 */
export const useAriaExpandedZIndex = (
    testId: string,
    expandedZIndex: number = 0,
    collapsedZIndex: number = 2,
): number => {
    const [zIndex, setZIndex] = useState(collapsedZIndex);

    useEffect(() => {
        const element = getElementByTestId(testId);

        if (element) {
            const updateZIndex = () => {
                const ariaExpanded = element.getAttribute('aria-expanded');
                setZIndex(
                    ariaExpanded === 'true' ? expandedZIndex : collapsedZIndex,
                );
            };

            updateZIndex(); // Set initial z-index

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'aria-expanded') {
                        updateZIndex();
                    }
                });
            });

            observer.observe(element, { attributes: true });
            return () => observer.disconnect();
        }
        return undefined;
    }, [testId, expandedZIndex, collapsedZIndex]);

    return zIndex;
};
