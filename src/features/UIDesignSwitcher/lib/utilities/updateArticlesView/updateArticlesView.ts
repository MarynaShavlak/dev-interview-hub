import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { ArticleView } from '@/entities/Article';

export const updateArticlesView = (value: string) => {
    const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY);

    if (value === 'old' && view === ArticleView.SEQUENCE) {
        localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, ArticleView.LIST);
    } else if (value === 'new' && view === ArticleView.LIST) {
        localStorage.setItem(
            ARTICLES_VIEW_LOCALSTORAGE_KEY,
            ArticleView.SEQUENCE,
        );
    }
};
