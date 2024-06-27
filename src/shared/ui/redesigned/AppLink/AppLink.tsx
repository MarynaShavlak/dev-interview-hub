import { Link, LinkProps } from 'react-router-dom';
import { memo, forwardRef, ForwardedRef, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
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
            ...otherProps
        } = props;

        return (
            <Link
                to={to}
                ref={ref}
                className={classNames(cls.AppLinkRedesigned, {}, [
                    className,
                    cls[variant],
                ])}
                {...otherProps}
            >
                {children}
            </Link>
        );
    },
);

export const AppLink = memo(AppLinkComponent);
