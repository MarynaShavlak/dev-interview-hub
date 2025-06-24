import { ArticleBlock } from '../../model/types/article';
import cls from './ArticleDetails.module.scss';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { SectionType } from '@/shared/types/sectionTypes';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';

/**
 * Renders a specific type of article block component based on the block's type.
 *
 * @param block - The `ArticleBlock` object containing the block's data and type.
 *
 * @returns A React component representing the block. This could be an `ArticleCodeBlockComponent`,
 *          `ArticleImageBlockComponent`, or `ArticleTextBlockComponent`, depending on the block type.
 *          Returns `null` if the block type is unrecognized.
 *
 */

export const renderArticleBlock = (block: ArticleBlock) => {
    switch (block.type) {
        case SectionType.CODE:
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    block={block}
                    className={cls.block}
                />
            );
        case SectionType.IMAGE:
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    block={block}
                    className={cls.block}
                />
            );
        case SectionType.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                    withTags={false}
                />
            );
        default:
            return null;
    }
};
