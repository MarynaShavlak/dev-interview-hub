import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './AuthByUsername.module.scss';
import { memo } from 'react';

interface AuthByUsernameProps {
    className?: string;
}

export const AuthByUsername = memo((props: AuthByUsernameProps) => {
    const { className } = props;
    const { t } = useTranslation();
    
    return (
        <div className={classNames(cls.AuthByUsername, {}, [className])}>
           
        </div>
    );
});