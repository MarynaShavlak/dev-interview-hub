import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AuthActionsRedesigned } from './AuthActionsRedesigned/AuthActionsRedesigned';
import { AuthActionsDeprecated } from './AuthActionsDeprecated/AuthActionsDeprecated';

export interface AuthActionsProps {
    onSuccess: () => void;
    onToggleForm: () => void;
    isLoginFormOpen: boolean;
}

export const AuthActions = memo((props: AuthActionsProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<AuthActionsRedesigned {...props} />}
            off={<AuthActionsDeprecated {...props} />}
        />
    );
});
