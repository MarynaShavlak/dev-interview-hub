import { useCallback, useRef } from 'react';
import { VirtuosoHandle } from 'react-virtuoso';
import { useVirtuosoGrid } from '../../../lib/hooks/useVirtuosoGrid/useVirtuosoGrid';
import { useArticlesPageActions } from '../../../model/slices/articlesPageSlice';
import { useScrollStopArticleIndex } from '../../../model/selectors/articlesPageSelectors';

/**
 * Custom hook for managing scroll position and behavior in an articles list or grid view.
 *
 * @returns {{
 *    listRef: React.RefObject<VirtuosoHandle>;
 *    gridRef: React.RefObject<VirtuosoGridHandle>;
 *    handleSaveArticlesPageScrollPosition: (index: number) => () => void;
 *    scrollStopArticleIndex: number;
 *    scrollVirtuosoGridToTop: () => void;
 *    scrollVirtuosoListToTop: () => void;
 *  }} An object with the following properties:
 *  *  * listRef: A reference to the Virtuoso list handle for controlling list scroll behavior.
 *  *  * gridRef: A reference to the Virtuoso grid handle for controlling grid scroll behavior.
 *  *  * handleSaveArticlesPageScrollPosition: Function to save the current article index as the scroll stop position.
 *  *  * scrollStopArticleIndex: The article index where the scroll stopped.
 *  *  * scrollVirtuosoGridToTop: Function to smoothly scroll the virtuoso grid to the top.
 *  *  * scrollVirtuosoListToTop: Function to smoothly scroll the virtuoso list to the top.
 *  *
 *  */

export const useArticlesScroll = () => {
    const listRef = useRef<VirtuosoHandle>(null);
    const scrollStopArticleIndex = useScrollStopArticleIndex();
    const gridRef = useVirtuosoGrid(scrollStopArticleIndex);

    const { setScrollStopArticleIndex } = useArticlesPageActions();

    const handleSaveArticlesPageScrollPosition = useCallback(
        (index: number) => () => {
            setScrollStopArticleIndex(index);
        },
        [setScrollStopArticleIndex],
    );

    // Scroll to the top of the virtuoso grid
    const scrollVirtuosoGridToTop = useCallback(() => {
        if (gridRef.current) {
            gridRef.current.scrollToIndex({
                index: 0,
                behavior: 'smooth',
            });
        }
    }, [gridRef]);

    // Scroll to the top of the virtuoso list
    const scrollVirtuosoListToTop = useCallback(() => {
        if (listRef.current) {
            listRef.current.scrollToIndex({
                index: 0,
                behavior: 'smooth',
            });
        }
    }, [listRef]);

    return {
        listRef,
        gridRef,
        handleSaveArticlesPageScrollPosition,
        scrollStopArticleIndex,
        scrollVirtuosoGridToTop,
        scrollVirtuosoListToTop,
    };
};
