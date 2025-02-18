import { EntityState } from '@reduxjs/toolkit';
import {
    ArticleSortField,
    ArticleCategory,
    ArticleView,
    Article,
    ArticleSort,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';

/**
 * Interface representing the schema for managing the articles page state.
 * This interface extends `EntityState` from Redux Toolkit to manage a collection of articles,
 * and includes additional properties for pagination, filtering, sorting and scroll position.
 *
 * @extends {EntityState<Article>}
 * @template T - The type of the entities.
 * @property {EntityId[]} ids - An array of unique identifiers for the articles.
 * @property {Dictionary<Article>} entities - A dictionary mapping article IDs to their corresponding article objects.
 *
 * Additional properties specific to the `ArticlesPageSchema` include:
 *
 * @property {boolean} [isLoading] - Indicates whether the articles are currently being loaded. This value is optional.
 * @property {string} [error] - Represents any error that occurred during the loading of articles. This value is optional.
 *
 * Pagination:
 * @property {number} page - The current page number of articles.
 * @property {number} limit - The number of articles per page.
 * @property {boolean} hasMore - Indicates whether there are more articles available beyond the current page.
 *
 * Filters:
 * @property {ArticleView} view - The view mode for displaying articles.
 * @property {SortOrder} order - The sorting order of articles (e.g., ascending or descending).
 * @property {ArticleSortField} sort - The field by which articles are sorted (e.g., by date of creation, title, views).
 * @property {string} search - The search query used to filter articles.
 * @property {ArticleCategory} category - The category used to filter articles.
 *
 * Scroll Position:
 * @property {number} scrollStopArticleIndex - Stores the index of the last article viewed by the user,
 * allowing the application to resume from the same position when revisiting the page.
 *
 * Initialization:
 * @property {boolean} _inited - Indicates whether the schema has been initialized. This value is optional.
 */

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;
    // filters
    view: ArticleView;
    order: SortOrder;
    sort: ArticleSortField | ArticleSort;
    search: string;
    category: ArticleCategory;

    // scroll
    scrollStopArticleIndex: number;

    _inited: boolean;
}

// import { EntityState } from '@reduxjs/toolkit';
// import {
//     Article,
//     ArticleSortField,
//     ArticleCategory,
//     ArticleView,
// } from '@/entities/Article';
// import { SortOrder } from '@/shared/types/sortOrder';
//
// /**
//  * Interface representing the schema for managing the articles page state.
//  * This interface extends `EntityState` from Redux Toolkit to manage a collection of articles,
//  * and includes additional properties for pagination, filtering, sorting and scroll position.
//  *
//  * @extends {EntityState<Article>}
//  * @template T - The type of the entities.
//  * @property {EntityId[]} ids - An array of unique identifiers for the articles.
//  * @property {Dictionary<Article>} entities - A dictionary mapping article IDs to their corresponding article objects.
//  *
//  * Additional properties specific to the `ArticlesPageSchema` include:
//  *
//  * @property {boolean} [isLoading] - Indicates whether the articles are currently being loaded. This value is optional.
//  * @property {string} [error] - Represents any error that occurred during the loading of articles. This value is optional.
//  *
//  * Pagination:
//  * @property {number} page - The current page number of articles.
//  * @property {number} limit - The number of articles per page.
//  * @property {boolean} hasMore - Indicates whether there are more articles available beyond the current page.
//  *
//  * Filters:
//  * @property {ArticleView} view - The view mode for displaying articles.
//  * @property {SortOrder} order - The sorting order of articles (e.g., ascending or descending).
//  * @property {ArticleSortField} sort - The field by which articles are sorted (e.g., by date of creation, title, views).
//  * @property {string} search - The search query used to filter articles.
//  * @property {ArticleCategory} category - The category used to filter articles.
//  *
//  * Scroll Position:
//  * @property {number} scrollStopArticleIndex - Stores the index of the last article viewed by the user,
//  * allowing the application to resume from the same position when revisiting the page.
//  *
//  * Initialization:
//  * @property {boolean} _inited - Indicates whether the schema has been initialized. This value is optional.
//  */
//
// export interface ArticlesPageSchema extends EntityState<Article> {
//     isLoading?: boolean;
//     error?: string;
//
//     // pagination
//     page: number;
//     limit: number;
//     hasMore: boolean;
//     // filters
//     view: ArticleView;
//     order: SortOrder;
//     sort: ArticleSortField;
//     search: string;
//     category: ArticleCategory;
//
//     // scroll
//     scrollStopArticleIndex: number;
//
//     _inited: boolean;
// }
