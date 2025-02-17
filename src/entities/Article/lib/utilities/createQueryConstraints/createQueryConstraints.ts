import { QueryConstraint, where, orderBy } from 'firebase/firestore';
import { ArticleSort } from '../../../model/types/article';
import { ArticleCategory } from '../../../model/consts/articleConsts';
import { SortOrder } from '@/shared/types/sortOrder';

interface CreateQueryConstraintArgs {
    sort: ArticleSort;
    order: SortOrder;
    category: ArticleCategory[];
}

export const createQueryConstraints = ({
    category,
    order,
    sort,
}: CreateQueryConstraintArgs): QueryConstraint[] => {
    const constraints: QueryConstraint[] = [];
    if (category.length > 0) {
        constraints.push(where('category', 'array-contains-any', category));
    }
    if (sort && order) {
        constraints.push(orderBy(sort, order));
    }

    return constraints;
};
