import { ArticleBlock } from '@/entities/Article';
import { SectionType } from '@/shared/types/sectionTypes';

export const getBlockImageUrls = (blocks: ArticleBlock[]): string[] => {
    return blocks.reduce((urls: string[], block: ArticleBlock) => {
        if (block.type === SectionType.IMAGE) {
            urls.push(block.src);
        }
        return urls;
    }, []);
};
