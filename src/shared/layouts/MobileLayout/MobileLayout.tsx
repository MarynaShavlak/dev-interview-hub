import React, { memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './MobileLayout.module.scss';

interface MobileLayoutProps {
    className?: string;
    navbar: ReactElement;
    content: ReactElement;

    toolbar?: ReactElement;
    rightbar?: ReactElement;
}

export const MobileLayout = memo((props: MobileLayoutProps) => {
    const { className, content, toolbar, navbar, rightbar } = props;

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.header}>
                {navbar}
                {rightbar}
            </div>
            <div className={cls.contentWrap}>
                <div className={cls.content}>{content}</div>
                <div className={cls.toolbar}>{toolbar}</div>
            </div>
        </div>
    );
});
