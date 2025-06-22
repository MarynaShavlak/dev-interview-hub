import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';

import { Each } from '@/shared/lib/components/Each/Each';
import { AddBlocksButtonsProps } from '../AddBlocksButtons';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../AddBlocksButtons.module.scss';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

export const AddBlocksButtonsDeprecated = memo(
    (props: AddBlocksButtonsProps) => {
        const { buttons, deleteAllBlocks, isSomeBlockAdded } = props;
        const { t } = useTranslation('articleDetails');
        const btnFlexClasses = getFlexClasses({
            hStack: true,
            gap: '16',
            align: 'center',
        });

        return (
            <>
                <Each
                    of={buttons}
                    render={(button) => (
                        <Button
                            key={button.type}
                            className={classNames(
                                cls.addButtonDeprecated,
                                {},
                                btnFlexClasses,
                            )}
                            onClick={button.onClick}
                        >
                            <Icon Svg={AddIcon} width={16} height={16} />
                            <span>
                                {t('блок')}
                                &nbsp;
                                <b>{t(button.translationKey)}</b>
                            </span>
                        </Button>
                    )}
                />

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
