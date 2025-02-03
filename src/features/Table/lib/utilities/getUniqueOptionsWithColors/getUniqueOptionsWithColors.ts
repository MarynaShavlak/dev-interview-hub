import { ColorOption } from '../../..';

export const getUniqueOptionsWithColors = <T, K extends keyof T>(
    data: T[],
    field: K,
): (string | ColorOption)[] => {
    return [
        ...new Set(data.map((item) => item[field] as string | ColorOption)),
    ];
};
