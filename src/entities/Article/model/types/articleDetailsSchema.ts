import { Article } from './article';

/**
 * Interface representing the schema for article details.
 *
 * @property {boolean} isLoading - Indicates if the article details are currently being loaded.
 * @property {string} [error] - Error message if loading article details failed. Optional.
 * @property {Article} [data] - The article data. Optional.
 */

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Article;
}
