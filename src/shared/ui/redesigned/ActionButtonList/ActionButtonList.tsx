import React from 'react';

import cls from './ActionButtonList.module.scss';
import { VStack } from '../../common/Stack';
import { Button } from '../Button';
import { Icon } from '../Icon';

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
    return (
        <VStack gap="16" className={className}>
            <Button
                variant="save"
                className={cls.blockActionButton}
                onClick={successAction.onClick}
                disabled={successAction.disabled}
                addonLeft={
                    successAction.icon && (
                        <Icon Svg={successAction.icon} width={16} height={16} />
                    )
                }
            >
                {successAction.label}
            </Button>
            <Button
                variant="cancel"
                className={cls.blockActionButton}
                onClick={cancelAction.onClick}
                disabled={cancelAction.disabled}
                addonLeft={
                    cancelAction.icon && (
                        <Icon Svg={cancelAction.icon} width={16} height={16} />
                    )
                }
            >
                {cancelAction.label}
            </Button>
        </VStack>
    );
};
