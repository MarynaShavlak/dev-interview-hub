import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/redesigned/Button';
import { VStack } from '@/shared/ui/common/Stack';
import { Icon } from '@/shared/ui/redesigned/Icon';
import AddIcon from '@/shared/assets/icons/plus.svg';
import cls from './TextBlockActionButtonList.module.scss';

interface TextBlockActionButtonListProps {
    saveTextBlock: () => void;
    deleteTextBlock: () => void;
    isSaveDisabled: boolean;
}

export const TextBlockActionButtonList = ({
    saveTextBlock,
    deleteTextBlock,
    isSaveDisabled,
}: TextBlockActionButtonListProps) => {
    const { t } = useTranslation('articleDetails');
    return (
        <VStack gap="16">
            <Button
                variant="save"
                addonLeft={<Icon Svg={AddIcon} width={16} height={16} />}
                onClick={saveTextBlock}
                className={cls.textBlockActionButton}
                disabled={isSaveDisabled}
            >
                {t('Зберегти')}
            </Button>
            <Button
                variant="cancel"
                onClick={deleteTextBlock}
                className={cls.textBlockActionButton}
            >
                {t('Видалити')}
            </Button>
        </VStack>
    );
};
