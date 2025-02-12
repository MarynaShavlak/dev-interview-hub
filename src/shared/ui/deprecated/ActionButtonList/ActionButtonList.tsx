import React from 'react';

import cls from './ActionButtonList.module.scss';
import { VStack } from '../../common/Stack';
import { Button, ButtonTheme } from '../Button';
import { Icon } from '../Icon';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

type ActionButtonType = {
    label: string;
    onClick: () => void;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    disabled?: boolean;
};

interface ActionButtonListProps {
    successAction: ActionButtonType;
    cancelAction: ActionButtonType;
    className?: string;
}

export const ActionButtonList = ({
    successAction,
    cancelAction,
    className,
}: ActionButtonListProps) => {
    const btnFlexClasses = getFlexClasses({
        hStack: true,
        gap: '16',
        align: 'center',
        justify: 'center',
    });

    return (
        <VStack gap="16" className={className}>
            <Button
                className={classNames(
                    cls.blockActionButton,
                    {},
                    btnFlexClasses,
                )}
                onClick={successAction.onClick}
                disabled={successAction.disabled}
            >
                {successAction.icon && (
                    <Icon Svg={successAction.icon} width={16} height={16} />
                )}
                {successAction.label}
            </Button>
            <Button
                theme={ButtonTheme.OUTLINE_RED}
                className={classNames(
                    cls.blockActionButton,
                    {},
                    btnFlexClasses,
                )}
                onClick={cancelAction.onClick}
                disabled={cancelAction.disabled}
            >
                {cancelAction.icon && (
                    <Icon Svg={cancelAction.icon} width={16} height={16} />
                )}
                {cancelAction.label}
            </Button>
        </VStack>
    );
};
