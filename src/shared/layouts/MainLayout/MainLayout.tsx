import { memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './MainLayout.module.scss';

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const { className, content, toolbar, header, sidebar } = props;

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.content}>{content}</div>
            <div className={cls.sidebar} data-testid="sidebar-wrap">
                {sidebar}
            </div>
            <div className={cls.rightbar}>
                <div className={cls.header}>{header}</div>
                <div className={cls.toolbar} data-testid="toolbar">
                    {toolbar}
                </div>
            </div>
        </div>
    );
});
