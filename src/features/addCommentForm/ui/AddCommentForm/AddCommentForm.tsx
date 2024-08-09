import { memo } from 'react';
import { RedesignedAddCommentForm } from './RedesignedAddCommentForm/RedesignedAddCommentForm';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedAddCommentForm } from './DeprecatedAddCommentForm/DeprecatedAddCommentForm';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addCommentFormReducer } from '../../model/slices/addCommentFormSlice';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<RedesignedAddCommentForm {...props} />}
                off={<DeprecatedAddCommentForm {...props} />}
            />
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
