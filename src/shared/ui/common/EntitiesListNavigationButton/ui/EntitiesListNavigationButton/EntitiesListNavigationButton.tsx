import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../redesigned/Icon';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    getRouteArticles,
    getRouteHRInterview,
} from '@/shared/const/router/router';
import { Button } from '../../../../redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '../../../../deprecated/Button';
import ArrowIcon from '@/shared/assets/icons/left-arrow.svg';
import cls from './EntitiesListNavigationButton.module.scss';
import { EntityType } from '@/shared/types/entityType';

interface EntitiesListNavigationButtonProps {
    type: EntityType;
}

export const EntitiesListNavigationButton = memo(
    (props: EntitiesListNavigationButtonProps) => {
        const { type } = props;
        const { t } = useTranslation('articleDetails');
        const navigate = useNavigate();

        const onNavigateToList = useCallback(() => {
            switch (type) {
                case 'article':
                    navigate(getRouteArticles());
                    break;
                case 'hrInterviewQA':
                    navigate(getRouteHRInterview());
                    break;
                default: {
                    const _exhaustiveCheck: never = type;
                    throw new Error(
                        `Unhandled entity type: ${_exhaustiveCheck}`,
                    );
                }
            }
        }, [navigate, type]);

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Button
                        size="s"
                        addonLeft={
                            <Icon width="12" height="12" Svg={ArrowIcon} />
                        }
                        onClick={onNavigateToList}
                        className={cls.ArticleListButton}
                    >
                        {type === 'article'
                            ? t('Всі статті')
                            : t('Всі питання')}
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
    },
);
