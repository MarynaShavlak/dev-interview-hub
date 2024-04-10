import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.links}>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to="/"
                    className={cls.mainLink}
                >
                    {t('Головна')}

                </AppLink>
                <AppLink
                    theme={AppLinkTheme.RED}
                    to="/about"
                >
                    {t('Про нас')}
                </AppLink>
            </div>
        </div>
    );
};
