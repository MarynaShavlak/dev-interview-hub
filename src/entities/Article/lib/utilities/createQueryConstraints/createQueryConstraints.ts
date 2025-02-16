import { QueryConstraint, where, orderBy } from 'firebase/firestore';
import { Article, ArticleCategory } from '../../..';

interface CreateQueryConstraintArgs {
    sort: keyof Article;
    order: 'asc' | 'desc';
    category: ArticleCategory[];
}

export const createQueryConstraints = ({
    category,
    order,
    sort,
}: CreateQueryConstraintArgs): QueryConstraint[] => {
    const constraints: QueryConstraint[] = [];
    if (category) {
        constraints.push(where('category', 'array-contains-any', category));
    }
    constraints.push(orderBy(sort, order));
    return constraints;
};
