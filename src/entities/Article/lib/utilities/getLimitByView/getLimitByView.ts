import { ArticleView } from '../../../model/consts/articleConsts';

export const getLimitByView = (view: ArticleView): number => {
    switch (view) {
        case ArticleView.SEQUENCE:
            return 20;
        case ArticleView.LIST:
            return 4;
        case ArticleView.GRID:
            return 9;
        default: {
            const exhaustiveCheck: never = view;
            throw new Error(`Unhandled ArticleView case: ${exhaustiveCheck}`);
        }
    }
};
