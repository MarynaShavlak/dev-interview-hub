import { ReactElement } from 'react';
import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line ms-production-project-plugin/layer-imports
import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    skeleton?: ReactElement;
    roles?: UserRole[];
};
