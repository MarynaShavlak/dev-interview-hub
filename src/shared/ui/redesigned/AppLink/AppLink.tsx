import { NavLink, LinkProps } from 'react-router-dom';
import {
    ForwardedRef,
    forwardRef,
    HTMLAttributeAnchorTarget,
    memo,
    ReactNode,
} from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

export interface AppLinkProps extends LinkProps {
    className?: string;
    to: string;
    variant?: AppLinkVariant;
    children: ReactNode;
    activeClassName?: string;
    target?: HTMLAttributeAnchorTarget;
}

export const AppLinkComponent = forwardRef<HTMLAnchorElement, AppLinkProps>(
    (props, ref: ForwardedRef<HTMLAnchorElement>) => {
        const {
            to,
            className,
            children,
            variant = 'primary',
            activeClassName = '',
            target = '_self',
            ...otherProps
        } = props;

        return (
            <NavLink
                to={to}
                target={target}
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
