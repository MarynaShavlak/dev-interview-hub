import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    useArticleDetailsData,
    useArticleDetailsError,
    useArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

/**
 * Custom hook for managing the state and data of article details.
 * @param {string} id - The unique identifier of the article to fetch.
 *
 * @returns {{
 *    article: object | null;
 *    isLoading: boolean;
 *    error: object | null;
 *  }} An object with the following properties:
 *  * `article`: The article details fetched from the server. This will be `null` if the article has not yet been fetched.
 *  * `isLoading`: A boolean indicating whether the article details are currently being loaded.
 *  * `error`: An error object if an error occurred while fetching the article, or `null` otherwise.
 *
 *
 */

export const useArticleDetails = (id: string) => {
    const dispatch = useAppDispatch();
    const article = useArticleDetailsData();
    const isLoading = useArticleDetailsIsLoading();
    const error = useArticleDetailsError();

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    });

    return {
        article,
        isLoading,
        error,
    };
};
