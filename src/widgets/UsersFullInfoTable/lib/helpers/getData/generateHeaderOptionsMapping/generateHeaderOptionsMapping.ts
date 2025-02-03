import { getUniqueOptionsWithColors } from '@/features/Table';
import { UsersTableInfo } from '../../../../model/types/usersTableInfo';
import { ColorOption } from '../../../../model/types/types';

export const generateHeaderOptionsMapping = (data: UsersTableInfo[]) => {
    if (data.length === 0) return {};
    return Object.fromEntries(
        // Use Object.keys of the first data item if it exists, or empty array as fallback
        (data.length > 0 ? Object.keys(data[0]) : []).map((field) => [
            field,
            getUniqueOptionsWithColors(
                data,
                field as keyof UsersTableInfo,
            ).filter(
                (option): option is string | ColorOption =>
                    option !== undefined,
            ),
        ]),
    );
};

export {};
