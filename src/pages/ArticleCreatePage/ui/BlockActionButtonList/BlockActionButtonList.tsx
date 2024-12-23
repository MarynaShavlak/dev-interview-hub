import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/redesigned/Button';
import { VStack } from '@/shared/ui/common/Stack';
import { Icon } from '@/shared/ui/redesigned/Icon';
import AddIcon from '@/shared/assets/icons/plus.svg';
import cls from './BlockActionButtonList.module.scss';

interface BlockActionButtonListProps {
    saveBlock: () => void;
    deleteBlock: () => void;
    isSaveDisabled: boolean;
}

export const BlockActionButtonList = ({
    saveBlock,
    deleteBlock,
    isSaveDisabled,
}: BlockActionButtonListProps) => {
    const { t } = useTranslation('articleDetails');
    return (
        <VStack gap="16">
            <Button
                variant="save"
                addonLeft={<Icon Svg={AddIcon} width={16} height={16} />}
                onClick={saveBlock}
                className={cls.blockActionButton}
                disabled={isSaveDisabled}
            >
                {t('Зберегти')}
            </Button>
            <Button
                variant="cancel"
                onClick={deleteBlock}
                className={cls.blockActionButton}
            >
                {t('Видалити')}
            </Button>
        </VStack>
    );
};
