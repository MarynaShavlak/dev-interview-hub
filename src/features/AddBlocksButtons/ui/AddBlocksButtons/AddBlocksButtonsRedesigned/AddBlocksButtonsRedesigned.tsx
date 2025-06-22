import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Button } from '@/shared/ui/redesigned/Button';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

import { Each } from '@/shared/lib/components/Each/Each';
import { AddBlocksButtonsProps } from '../AddBlocksButtons';
import cls from '../AddBlocksButtons.module.scss';

export const AddBlocksButtonsRedesigned = memo(
    (props: AddBlocksButtonsProps) => {
        const { buttons, deleteAllBlocks, isSomeBlockAdded } = props;
        const { t } = useTranslation('articleDetails');

        return (
            <>
                <Each
                    of={buttons}
                    render={(button) => (
                        <Button
                            key={button.type}
                            variant="filled"
                            addonLeft={
                                <Icon Svg={AddIcon} width={16} height={16} />
                            }
                            className={cls.addButton}
                            onClick={button.onClick}
                        >
                            <span>
                                {t('блок')}
                                &nbsp;
                                <b>{t(button.translationKey)}</b>
                            </span>
                        </Button>
                    )}
                />

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
