import { memo } from 'react';
import { AddCommentFormRedesigned } from './AddCommentFormRedesigned/AddCommentFormRedesigned';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddCommentFormDeprecated } from './AddCommentFormDeprecated/AddCommentFormDeprecated';

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
                on={<AddCommentFormRedesigned {...props} />}
                off={<AddCommentFormDeprecated {...props} />}
            />
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
