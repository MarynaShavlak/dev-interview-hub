import { ArticleView } from '@/entities/Article';

export const getLimitByView = (view: ArticleView): number => {
    switch (view) {
        case ArticleView.SEQUENCE:
            return 20;
        case ArticleView.LIST:
            return 4;
        default:
            return 9;
    }
};
