import { ArticleTextBlock } from '@/entities/Article';
import { HRInterviewQABlock } from '@/entities/HRInterviewQA';

export const isArticleBlock = (
    block: ArticleTextBlock | HRInterviewQABlock,
): block is ArticleTextBlock => {
    return (block as ArticleTextBlock).type === 'TEXT';
};
