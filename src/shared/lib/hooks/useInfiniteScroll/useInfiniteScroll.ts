import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef?: MutableRefObject<HTMLElement>;
    callback?: () => void;
}

/**
 * A custom hook that sets up an infinite scroll mechanism using the IntersectionObserver API.
 *
 * @param {Object} options - The options object for configuring the hook.
 * @param {MutableRefObject<HTMLElement>} options.triggerRef - A reference to the element that will trigger the callback when it intersects the viewport.
 * @param {MutableRefObject<HTMLElement>} [options.wrapperRef] - An optional reference to the wrapper element that serves as the viewport for the IntersectionObserver. Defaults to the browser viewport if not provided.
 * @param {() => void} [options.callback] - An optional callback function to be called when the trigger element intersects the viewport.
 *
 * @returns {void} This hook does not return any value.
 */

export function useInfiniteScroll({
    callback,
    wrapperRef,
    triggerRef,
}: UseInfiniteScrollOptions) {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const wrapperElement = wrapperRef?.current || null;
        const triggerElement = triggerRef.current;

        if (callback) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.current.observe(triggerElement);
        }

        return () => {
            if (observer.current && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.current.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
