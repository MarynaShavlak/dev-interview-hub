import { generateCategories } from '@/shared/lib/generateCategories/generateCategories';

const labelsEng: Record<string, string> = {
    codeReview: 'Code review',
    promise: 'Promise',
    arrays: 'Arrays',
};

const labelsUkr: Record<string, string> = {
    codeReview: "Код рев'ю",
    promise: 'Проміси',
    arrays: 'Масиви',
};

export const LiveCodeCategoriesEng = generateCategories(labelsEng);
export const LiveCodeCategoriesUkr = generateCategories(labelsUkr);
