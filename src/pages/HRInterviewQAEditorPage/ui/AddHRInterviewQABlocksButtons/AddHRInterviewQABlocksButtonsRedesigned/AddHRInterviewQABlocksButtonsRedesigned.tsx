import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import cls from '../AddHRInterviewQABlocksButtons.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { AddHRInterviewQABlocksButtonsProps } from '../AddHRInterviewQABlocksButtons';

export const AddHRInterviewQABlocksButtonsRedesigned = memo(
    (props: AddHRInterviewQABlocksButtonsProps) => {
        const {
            onAddTextBlockBtnClick,

            deleteAllBlocks,
            isSomeBlockAdded,
        } = props;
        const { t } = useTranslation('articleDetails');

        return (
            <>
                <Button
                    variant="filled"
                    addonLeft={<Icon Svg={AddIcon} width={16} height={16} />}
                    className={cls.addButton}
                    onClick={onAddTextBlockBtnClick}
                >
                    <span>
                        {t('блок')}
                        &nbsp;
                        <b>{t('тексту')}</b>
                    </span>
                </Button>

                <Button
                    variant="cancel"
                    className={cls.deleteBtn}
                    onClick={deleteAllBlocks}
                    disabled={!isSomeBlockAdded}
                >
                    {t('Видалити всі')}
                </Button>
            </>
        );
    },
);
