import { Link, LinkProps } from 'react-router-dom';
import {
    memo, forwardRef, ForwardedRef, ReactNode,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

export interface AppLinkProps extends LinkProps {
    to: string;
    className?: string;
    theme?: AppLinkTheme;
    children: ReactNode;
}

export const AppLinkComponent = forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref: ForwardedRef<HTMLAnchorElement>) => {
    const {
        to,
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            ref={ref}
            className={classNames(cls.AppLink, { [cls[theme]]: true }, [className])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});

export const AppLink = memo(AppLinkComponent);
