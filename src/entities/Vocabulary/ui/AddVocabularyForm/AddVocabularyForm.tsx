import { memo } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addVocabularyFormReducer } from '../../model/slices/addVocabularyFormSlice';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { AddVocabularyFormRedesigned } from './AddVocabularyFormRedesigned/AddVocabularyFormRedesigned';
import { AddVocabularyFormDeprecated } from './AddVocabularyFormDeprecated/AddVocabularyFormDeprecated';

export interface AddVocabularyFormProps {
    className?: string;
    onAddVocabulary: (
        text: string,
        meaning: string,
        translation: string,
    ) => void;
}

const reducers: ReducersList = {
    addVocabularyForm: addVocabularyFormReducer,
};

const AddVocabularyForm = memo((props: AddVocabularyFormProps) => {
    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<AddVocabularyFormRedesigned {...props} />}
                off={<AddVocabularyFormDeprecated {...props} />}
            />
        </DynamicModuleLoader>
    );
});

export default AddVocabularyForm;
