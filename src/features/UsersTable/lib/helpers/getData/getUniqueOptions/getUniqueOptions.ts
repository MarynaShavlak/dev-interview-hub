import { ColorOption } from '../../../../model/types/types';

export const getUniqueOptions = <T, K extends keyof T>(
    data: T[],
    field: K,
): (string | ColorOption)[] => {
    return [
        ...new Set(data.map((item) => item[field] as string | ColorOption)),
    ];
};
