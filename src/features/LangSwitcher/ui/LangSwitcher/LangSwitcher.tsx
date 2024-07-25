import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Button } from '@/shared/ui/redesigned/Button';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggleLang = async () => {
        i18n.changeLanguage(i18n.language === 'uk' ? 'en' : 'uk');
    };

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Button variant="clear" onClick={toggleLang}>
                    {t(short ? 'Мова абревіатура' : 'Мова')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={className}
                    theme={ButtonTheme.CLEAR}
                    onClick={toggle}
                >
                    {t(short ? 'Мова абревіатура' : 'Мова')}
                </ButtonDeprecated>
            }
        />
    );
});
