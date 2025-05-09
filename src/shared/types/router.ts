import { ReactElement } from 'react';
import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line path-supervisor/layer-imports
import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    skeleton: ReactElement;
    roles?: UserRole[];
};
