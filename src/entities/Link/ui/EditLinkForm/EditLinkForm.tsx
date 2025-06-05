import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Link } from '../..';
import { EditLinkFormRedesigned } from './EditLinkFormRedesigned/EditLinkFormRedesigned';
import { EditLinkFormDeprecated } from './EditLinkFormDeprecated/EditLinkFormDeprecated';

export interface EditLinkFormProps {
    link: Link;
    onCancel: () => void;
    onSave: (updatedLink: Link) => void;
}

export const EditLinkForm = memo((props: EditLinkFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<EditLinkFormRedesigned {...props} />}
            off={<EditLinkFormDeprecated {...props} />}
        />
    );
});
