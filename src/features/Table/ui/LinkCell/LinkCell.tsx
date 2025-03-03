import React from 'react';
import { CellContext } from '@tanstack/react-table';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';

interface LinkCellProps<TData> extends CellContext<TData, any> {
    value: string;
    navigateFn: (id: string) => void;
}

export const LinkCell = <TData extends { id: string }>({
    value,
    navigateFn,
    row,
}: LinkCellProps<TData>) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Button
                    onClick={() => navigateFn(row.original.id)}
                    variant="clear"
                >
                    {value}
                </Button>
            }
            off={
                <ButtonDeprecated
                    theme={ButtonTheme.CLEAR}
                    onClick={() => navigateFn(row.original.id)}
                >
                    {value}
                </ButtonDeprecated>
            }
        />
    );
};
