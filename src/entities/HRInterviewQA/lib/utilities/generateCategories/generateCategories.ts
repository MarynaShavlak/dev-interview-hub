import { HRInterviewQACategory } from '../../../model/types/hrInterviewQA';
import { baseCategories } from '../../../model/data/baseCategories';

export const generateCategories = (
    labels: Record<string, string>,
): HRInterviewQACategory[] => {
    return baseCategories.map(({ key, subcategories }) => ({
        key,
        label: labels[key],
        subcategories: subcategories.map(({ key }) => ({
            key,
            label: labels[key],
        })),
    }));
};
