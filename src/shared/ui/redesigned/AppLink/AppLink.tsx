import { NavLink, LinkProps } from 'react-router-dom';
import { ForwardedRef, forwardRef, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

export interface AppLinkProps extends LinkProps {
    className?: string;
    to: string;
    variant?: AppLinkVariant;
    children: ReactNode;
    activeClassName?: string;
}

export const AppLinkComponent = forwardRef<HTMLAnchorElement, AppLinkProps>(
    (props, ref: ForwardedRef<HTMLAnchorElement>) => {
        const {
            to,
            className,
            children,
            variant = 'primary',
            activeClassName = '',
            ...otherProps
        } = props;

        return (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    classNames(cls.AppLink, { [activeClassName]: isActive }, [
                        className,
                        cls[variant],
                    ])
                }
                {...otherProps}
            >
                {children}
            </NavLink>
        );
    },
);

export const AppLink = memo(AppLinkComponent);
