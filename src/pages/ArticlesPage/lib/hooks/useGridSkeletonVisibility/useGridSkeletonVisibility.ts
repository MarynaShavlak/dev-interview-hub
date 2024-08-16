import {
    useArticlesPageIsLoading,
    useArticlesPageView,
} from '../../../model/selectors/articlesPageSelectors';
import { ArticleView } from '@/entities/Article';
import { useArticlesScroll } from '../useArticlesScroll/useArticlesScroll';

/**
 * Custom hook for determining the visibility of the grid skeleton (loading placeholder) based on the view mode and loading state.
 *
 * This hook evaluates whether the grid skeleton should be shown during the initial rendering or when switching to the grid view while articles are loading. It helps manage the display of loading indicators specific to grid layouts, improving user experience during content fetching or view transitions.
 *
 * @returns {boolean} A boolean indicating whether the grid skeleton should be displayed. Returns `true` if the grid view is loading or switching while articles are loading, otherwise returns `false`.
 *
 * The hook uses `useArticlesPageView` to get the current view setting, `useArticlesPageIsLoading` to check the loading state, and `useArticlesScroll` to access the grid reference. It calculates the visibility based on:
 * - **Initial Rendering**: Checks if the view is `GRID`, the grid component is available, and articles are loading.
 * - **View Switching**: Checks if the grid component is not available and articles are loading.
 *
 * By returning `true` or `false`, the hook allows components to conditionally render the grid skeleton or the actual grid content, enhancing the responsiveness and clarity of the UI during data loading and view transitions.
 */

export const useGridSkeletonVisibility = () => {
    const view = useArticlesPageView();
    const isLoading = useArticlesPageIsLoading();
    const { gridRef } = useArticlesScroll();

    const isGridViewLayoutFirstRendering =
        view === ArticleView.GRID && gridRef.current && isLoading;
    const isGridViewLayoutSwitching = !gridRef.current && isLoading;

    const shouldShowGridSkeleton =
        isGridViewLayoutFirstRendering || isGridViewLayoutSwitching;

    return shouldShowGridSkeleton;
};
