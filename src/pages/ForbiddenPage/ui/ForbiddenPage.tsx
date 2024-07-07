import React from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

const ForbiddenPage = () => {
    const { t } = useTranslation('about');
    const errorMessage = t('У Вас немає доступу до цієї сторінки');
    return (
        <Page data-testid="ForbiddenPage">
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text text={errorMessage} />}
                off={<TextDeprecated text={errorMessage} />}
            />
        </Page>
    );
};

export default ForbiddenPage;
