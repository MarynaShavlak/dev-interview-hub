import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { AddLiveCodeCategoryFormDeprecated } from './AddLiveCodeCategoryFormDeprecated/AddLiveCodeCategoryFormDeprecated';
import { AddLiveCodeCategoryFormRedesigned } from './AddLiveCodeCategoryFormRedesigned/AddLiveCodeCategoryFormRedesigned';

export interface AddLiveCodeCategoryFormProps {
    index: number;
}

export const AddLiveCodeCategoryForm = (
    props: AddLiveCodeCategoryFormProps,
) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<AddLiveCodeCategoryFormRedesigned {...props} />}
            off={<AddLiveCodeCategoryFormDeprecated {...props} />}
        />
    );
};
