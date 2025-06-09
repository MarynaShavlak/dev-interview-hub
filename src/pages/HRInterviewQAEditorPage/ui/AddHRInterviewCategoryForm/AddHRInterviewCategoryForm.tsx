import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { AddHRInterviewCategoryFormDeprecated } from './AddHRInterviewCategoryFormDeprecated/AddHRInterviewCategoryFormDeprecated';
import { AddHRInterviewCategoryFormRedesigned } from './AddHRInterviewCategoryFormRedesigned/AddHRInterviewCategoryFormRedesigned';

export interface AddHRInterviewCategoryFormProps {
    index: number;
}

export const AddHRInterviewCategoryForm = (
    props: AddHRInterviewCategoryFormProps,
) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<AddHRInterviewCategoryFormRedesigned {...props} />}
            off={<AddHRInterviewCategoryFormDeprecated {...props} />}
        />
    );
};
