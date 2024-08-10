import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';

/**
 * Interface representing the schema for managing article comments.
 * This interface extends `EntityState` from Redux Toolkit, which provides a standard way to handle collections of entities in Redux.
 *
 * @extends {EntityState<Comment>}
 * @template T - The type of the entities.
 * @property {EntityId[]} ids - An array of unique identifiers for the entities.
 * @property {Dictionary<T>} entities - A dictionary mapping entity IDs to their corresponding entity objects.
 *
 * Additional properties specific to the `ArticleCommentsSchema` include:
 *
 * @property {boolean} [isLoading] - Indicates whether the comments are currently being loaded. This value is optional.
 * @property {string} [error] - Represents any error that occurred during the loading of comments. This value is optional.
 */

export interface ArticleCommentsSchema extends EntityState<Comment> {
    isLoading?: boolean;
    error?: string;
}
