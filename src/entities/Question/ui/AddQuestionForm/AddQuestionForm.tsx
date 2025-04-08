import { memo } from 'react';
import { AddQuestionFormRedesigned } from './AddQuestionFormRedesigned/AddQuestionFormRedesigned';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddQuestionFormDeprecated } from './AddQuestionFormDeprecated/AddQuestionFormDeprecated';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addQuestionFormReducer } from '../../model/slices/addQuestionFormSlice';

export interface AddQuestionFormProps {
    className?: string;
    onAddQuestion: (text: string) => void;
}

const reducers: ReducersList = {
    addQuestionForm: addQuestionFormReducer,
};

const AddQuestionForm = memo((props: AddQuestionFormProps) => {
    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<AddQuestionFormRedesigned {...props} />}
                off={<AddQuestionFormDeprecated {...props} />}
            />
        </DynamicModuleLoader>
    );
});

export default AddQuestionForm;
