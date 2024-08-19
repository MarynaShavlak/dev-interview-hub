import type { User } from '@/entities/User';
import { ArticleSection, ArticleCategory } from '../consts/articleConsts';

/**
 * Base interface for different types of article blocks.
 *
 * @property {string} id - Unique identifier for the article block.
 * @property {ArticleSection} type - The type of the article block.
 */
export interface ArticleBlockBase {
    id: string;
    type: ArticleSection;
}

/**
 * Interface for a code block in an article.
 *
 * @property {ArticleSection} type - The type of the article block, set to CODE.
 * @property {string} code - The code content of the block.
 */
export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleSection.CODE;
    code: string;
}

/**
 * Interface for an image block in an article.
 *
 * @property {ArticleSection} type - The type of the article block, set to IMAGE.
 * @property {string} src - The source URL of the image.
 * @property {string} title - The title or caption of the image.
 */
export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleSection.IMAGE;
    src: string;
    title: string;
}

/**
 * Interface for a text block in an article.
 *
 * @property {ArticleSection} type - The type of the article block, set to TEXT.
 * @property {string[]} paragraphs - Array of paragraphs in the text block.
 * @property {string} [title] - The title of the text block. Optional.
 */

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleSection.TEXT;
    paragraphs: string[];
    title?: string;
}

/**
 * Union type representing the different types of article blocks.
 */

export type ArticleBlock =
    | ArticleCodeBlock
    | ArticleImageBlock
    | ArticleTextBlock;

/**
 * Interface representing an article.
 *
 * @property {string} id - Unique identifier for the article.
 * @property {User} user - The user who created the article.
 * @property {string} title - The title of the article.
 * @property {string} subtitle - The subtitle of the article.
 * @property {string} img - The URL of the article's cover image.
 * @property {number} views - The number of views the article has received.
 * @property {string} createdAt - The creation date of the article.
 * @property {ArticleCategory[]} category - Array of categories the article belongs to.
 * @property {ArticleBlock[]} blocks - Array of content blocks within the article.
 */

export interface Article {
    id: string;
    user: User;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    category: ArticleCategory[];
    blocks: ArticleBlock[];
}
