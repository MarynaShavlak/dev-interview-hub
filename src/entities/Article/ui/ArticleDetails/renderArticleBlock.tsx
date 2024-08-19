import { ArticleBlock } from '../../model/types/article';
import { ArticleSection } from '../../model/consts/articleConsts';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import cls from './ArticleDetails.module.scss';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

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
        case ArticleSection.CODE:
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    block={block}
                    className={cls.block}
                />
            );
        case ArticleSection.IMAGE:
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    block={block}
                    className={cls.block}
                />
            );
        case ArticleSection.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        default:
            return null;
    }
};
