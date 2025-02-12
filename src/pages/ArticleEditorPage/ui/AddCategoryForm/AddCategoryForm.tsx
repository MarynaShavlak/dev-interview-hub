import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { AddCategoryFormDeprecated } from './AddCategoryFormDeprecated/AddCategoryFormDeprecated';
import { AddCategoryFormRedesigned } from './AddCategoryFormRedesigned/AddCategoryFormRedesigned';

export interface AddCategoryFormProps {
    index: number;
}

export const AddCategoryForm = (props: AddCategoryFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<AddCategoryFormRedesigned {...props} />}
            off={<AddCategoryFormDeprecated {...props} />}
        />
    );
};
