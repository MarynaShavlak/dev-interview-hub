import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';
import { getUniqueStringOptions } from '@/features/Table';

export const generateHeaderOptionsMapping = (data: UserArticlesTableInfo[]) => {
    if (data.length === 0) return {};

    return Object.fromEntries(
        Object.keys(data[0]).map((field) => [
            field,
            getUniqueStringOptions(
                data,
                field as keyof UserArticlesTableInfo,
            ).filter((option): option is string => option !== undefined),
        ]),
    );
};
