import React from 'react';
import { useUsersFullData } from '../../lib/hooks/useUsersFullData';
import { generateTableColumnsData } from '../../lib/helpers/generateTableColumnsData/generateTableColumnsData';
import { Table } from '@/shared/ui/common/Table/Table';

export const UsersInfoTable = () => {
    const { users } = useUsersFullData();
    console.log(users);

    const columns = generateTableColumnsData(users);
    console.log(columns);

    return <Table data={users} columns={columns} />;
};
