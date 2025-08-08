import { cloneElement, memo, ReactElement, useState } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './MobileMenu.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import MenuIcon from '@/shared/assets/icons/burger.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';

interface MobileMenuProps {
    className?: string;
    menu: ReactElement;
}

export const MobileMenu = memo((props: MobileMenuProps) => {
    const { className, menu } = props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const handleOpenMobileMenu = () => setIsMobileMenuOpen(true);
    const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

    const menuWithCloseHandler = cloneElement(menu, {
        onItemClick: handleCloseMobileMenu,
    });

    return (
        <div className={classNames(cls.menu, {}, [className])}>
            <div className={cls.iconWrap}>
                <Icon Svg={MenuIcon} clickable onClick={handleOpenMobileMenu} />
            </div>

            {isMobileMenuOpen && (
                <div className={cls.mobileMenu}>
                    <div className={cls.iconWrap}>
                        <Icon
                            variant="primary"
                            Svg={CloseIcon}
                            className={cls.closeIcon}
                            clickable
                            onClick={handleCloseMobileMenu}
                        />
                    </div>

                    <div>{menuWithCloseHandler}</div>
                </div>
            )}
        </div>
    );
});
