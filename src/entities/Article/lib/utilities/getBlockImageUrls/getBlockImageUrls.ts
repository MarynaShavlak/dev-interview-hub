import { ArticleBlock } from '../../../model/types/article';
import { ArticleSection } from '../../../model/consts/articleConsts';

export const getBlockImageUrls = (blocks: ArticleBlock[]): string[] => {
    return blocks.reduce((urls: string[], block: ArticleBlock) => {
        if (block.type === ArticleSection.IMAGE) {
            urls.push(block.src);
        }
        return urls;
    }, []);
};
