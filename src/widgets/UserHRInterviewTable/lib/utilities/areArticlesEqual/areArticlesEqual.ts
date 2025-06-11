import { HRInterviewQA } from '@/entities/HRInterviewQA';

export const areArticlesEqual = (
    arr1: HRInterviewQA[] | null,
    arr2: HRInterviewQA[] | null,
): boolean => {
    if (!arr1 || !arr2) return arr1 === arr2;
    if (arr1.length !== arr2.length) return false;

    return arr1.every((item, index) => {
        const other = arr2[index];
        const { title, id, createdAt, category } = item;
        return (
            id === other.id &&
            title === other.title &&
            createdAt === other.createdAt &&
            category === other.category
        );
    });
};
