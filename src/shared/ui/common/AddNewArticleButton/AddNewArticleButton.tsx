import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
// import { useArticleDetailsData } from '@/entities/Article';
import { getRouteArticleCreate } from '@/shared/const/router/router';
import { Button } from '../../redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '../../deprecated/Button';

import cls from './AddNewArticleButton.module.scss';

interface ArticleCreateNavigationButtonProps {
    max?: boolean;
    onClick?: () => void;
}

export const AddNewArticleButton = memo(
    ({ max = false, onClick }: ArticleCreateNavigationButtonProps) => {
        const { t } = useTranslation('articles');

        const navigate = useNavigate();

        const onCreateArticle = useCallback(() => {
            onClick?.();
            navigate(getRouteArticleCreate());
        }, [navigate, onClick]);
        const buttonText = t('Створити статтю');

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Button
                        size="m"
                        onClick={onCreateArticle}
                        className={cls.addButton}
                        variant="save"
                        max={max}
                    >
                        {buttonText}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        theme={ButtonTheme.OUTLINE}
                        onClick={onCreateArticle}
                    >
                        {buttonText}
                    </ButtonDeprecated>
                }
            />
        );
    },
);
