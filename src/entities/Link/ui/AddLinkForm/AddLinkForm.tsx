import { memo } from 'react';
import { AddLinkFormRedesigned } from './AddLinkFormRedesigned/AddLinkFormRedesigned';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddLinkFormDeprecated } from './AddLinkFormDeprecated/AddLinkFormDeprecated';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addLinkFormReducer } from '../../model/slices/addLinkFormSlice';

export interface AddLinkFormProps {
    className?: string;
    onAddLink: (text: string) => void;
}

const reducers: ReducersList = {
    addLinkForm: addLinkFormReducer,
};

const AddLinkForm = memo((props: AddLinkFormProps) => {
    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<AddLinkFormRedesigned {...props} />}
                off={<AddLinkFormDeprecated {...props} />}
            />
        </DynamicModuleLoader>
    );
});

export default AddLinkForm;
