import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { getRouteArticles } from '@/shared/const/router/router';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import ArrowIcon from '@/shared/assets/icons/left-arrow.svg';
import cls from './ArticleListButton.module.scss';

export const ArticleListButton = memo(() => {
    const { t } = useTranslation('article-details');
    const navigate = useNavigate();

    const onNavigateToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Button
                    size="s"
                    addonLeft={<Icon width="12" height="12" Svg={ArrowIcon} />}
                    onClick={onNavigateToList}
                    className={cls.ArticleListButton}
                >
                    {t('Всі статті')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onNavigateToList}
                >
                    {t('Назад до списку')}
                </ButtonDeprecated>
            }
        />
    );
});
