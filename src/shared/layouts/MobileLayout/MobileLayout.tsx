import React, { memo, ReactElement, useState } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './MobileLayout.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import MenuIcon from '@/shared/assets/icons/burger.svg';

interface MobileLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;

    toolbar?: ReactElement;
}

export const MobileLayout = memo((props: MobileLayoutProps) => {
    const { className, content, toolbar, header } = props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const handleOpenMobileMenu = () => setIsMobileMenuOpen(true);
    const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.header}>
                {header}
                <div className={cls.iconWrap}>
                    <Icon
                        Svg={MenuIcon}
                        clickable
                        onClick={handleOpenMobileMenu}
                    />
                </div>
            </div>
            <div className={cls.contentWrap}>
                <div className={cls.content}>{content}</div>
                <div className={cls.toolbar}>{toolbar}</div>
            </div>
            {isMobileMenuOpen && (
                <div>Mobile Menu here</div>
                // <MenuMobile
                //     handleCloseMobileMenu={handleCloseMobileMenu}
                //     isMobileMenuOpen={isMobileMenuOpen}
                // />
            )}
        </div>
    );
});
