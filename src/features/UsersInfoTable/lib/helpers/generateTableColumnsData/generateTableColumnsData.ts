import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';
import { UserFullInfo } from '../../../model/types/userFullInfo';
import { splitCamelCase } from '@/shared/lib/text/splitCamelCase/splitCamelCase';

export const generateTableColumnsData = (users: UserFullInfo[]) => {
    if (!users.length) return [];

    const userKeys = Object.keys(users[0]);

    const columns = userKeys.map((key) => {
        return {
            Header: capitalizeFirstLetter(splitCamelCase(key)),
            accessor: key as keyof UserFullInfo,
            image: key === 'avatar',
        };
    });

    return columns;
};
