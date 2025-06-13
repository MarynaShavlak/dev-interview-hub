import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import cls from '../AddHRInterviewQABlocksButtons.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { AddHRInterviewQABlocksButtonsProps } from '../AddHRInterviewQABlocksButtons';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

export const AddHRInterviewQABlocksButtonsDeprecated = memo(
    (props: AddHRInterviewQABlocksButtonsProps) => {
        const {
            onAddTextBlockBtnClick,

            deleteAllBlocks,
            isSomeBlockAdded,
        } = props;
        const { t } = useTranslation('articleDetails');

        const btnFlexClasses = getFlexClasses({
            hStack: true,
            gap: '16',
            align: 'center',
        });

        return (
            <>
                <Button
                    className={classNames(
                        cls.addButtonDeprecated,
                        {},
                        btnFlexClasses,
                    )}
                    onClick={onAddTextBlockBtnClick}
                >
                    <Icon Svg={AddIcon} width={16} height={16} />
                    <span>
                        {t('блок')}
                        &nbsp;
                        <b>{t('тексту')}</b>
                    </span>
                </Button>

                <Button
                    theme={ButtonTheme.OUTLINE_RED}
                    className={classNames(cls.deleteButton, {}, btnFlexClasses)}
                    onClick={deleteAllBlocks}
                    disabled={!isSomeBlockAdded}
                >
                    {t('Видалити всі')}
                </Button>
            </>
        );
    },
);
