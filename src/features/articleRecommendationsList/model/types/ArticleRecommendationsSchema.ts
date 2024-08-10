import { EntityState } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';

/**
 * Interface representing the schema for managing the article recommendations state.
 * This interface extends `EntityState` from Redux Toolkit to manage a collection of article recommendations
 * and includes additional properties to track loading status and error information.
 *
 * @extends {EntityState<Article>}
 * @template T - The type of the entities.
 * @property {EntityId[]} ids - An array of unique identifiers for the articles.
 * @property {Dictionary<Article>} entities - A dictionary mapping article IDs to their corresponding article objects.
 *
 * Additional properties specific to the `ArticleRecommendationsSchema` include:
 *
 * @property {boolean} [isLoading] - Indicates whether the article recommendations are currently being loaded. This value is optional.
 * @property {string} [error] - Represents any error that occurred during the loading of article recommendations. This value is optional.
 *
 */

export interface ArticleRecommendationsSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
}
