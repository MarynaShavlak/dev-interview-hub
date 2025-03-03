import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';

export const areArticlesEqual = (
    arr1: UserArticlesTableInfo[] | null,
    arr2: UserArticlesTableInfo[] | null,
): boolean => {
    if (!arr1 || !arr2) return arr1 === arr2;
    if (arr1.length !== arr2.length) return false;

    return arr1.every((item, index) => {
        const other = arr2[index];
        const {
            title,
            id,
            img,
            createdAt,
            views,
            categories,
            commentsQuantity,
            averageRating,
        } = item;
        return (
            id === other.id &&
            title === other.title &&
            img === other.img &&
            createdAt === other.createdAt &&
            views === other.views &&
            categories === other.categories &&
            commentsQuantity === other.commentsQuantity &&
            averageRating === other.averageRating
        );
    });
};
